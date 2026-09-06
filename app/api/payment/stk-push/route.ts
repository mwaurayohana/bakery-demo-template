import { NextResponse } from "next/server";
import { isValidPaymentAmount, normalizeKenyanPhone } from "@/lib/format";

type StkPushRequest = {
  phone?: string;
  amount?: number;
  order?: {
    customer?: string;
    deliveryPhone?: string | null;
    address?: string;
    note?: string;
    items?: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
    }>;
  };
};

function createDarajaTimestamp() {
  return new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as StkPushRequest;
    const phone = normalizeKenyanPhone(body.phone ?? "");
    const amount = Number(body.amount);

    if (!phone) {
      return NextResponse.json({ message: "A valid Kenyan mobile number is required." }, { status: 400 });
    }

    if (!isValidPaymentAmount(amount)) {
      return NextResponse.json({ message: "Order amount must be greater than zero." }, { status: 400 });
    }

    if (!body.order?.items?.length) {
      return NextResponse.json({ message: "Order must include at least one item." }, { status: 400 });
    }

    const shortCode = process.env.DARAJA_SHORT_CODE ?? "174379";
    const passKey = process.env.DARAJA_PASSKEY ?? "replace-with-daraja-passkey";
    const callbackUrl =
      process.env.MPESA_CALLBACK_URL ?? "https://your-domain.example.com/api/payment/callback";
    const timestamp = createDarajaTimestamp();
    const password = Buffer.from(`${shortCode}${passKey}${timestamp}`).toString("base64");

    const darajaPayload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(amount),
      PartyA: phone.replace("+", ""),
      PartyB: shortCode,
      PhoneNumber: phone.replace("+", ""),
      CallBackURL: callbackUrl,
      AccountReference: `CRUMB-${Date.now()}`,
      TransactionDesc: "Crumb & Crown pastry order"
    };

    /*
      Production flow:
      1. Request OAuth token:
         GET https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials
         Authorization: Basic base64(DARAJA_CONSUMER_KEY:DARAJA_CONSUMER_SECRET)
      2. POST darajaPayload to:
         https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest
         Authorization: Bearer <access_token>
      3. Persist CheckoutRequestID, MerchantRequestID, order details, and a pending status.
      4. Update the order in /api/payment/callback when Safaricom sends ResultCode.
    */

    return NextResponse.json({
      message: "STK push payload prepared. Gateway call is stubbed for safe local development.",
      checkoutRequestId: `demo-${Date.now()}`,
      gateway: "Safaricom Daraja M-Pesa STK Push",
      payload: darajaPayload
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unable to prepare payment request.",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
