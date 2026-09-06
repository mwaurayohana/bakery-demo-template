import { NextResponse } from "next/server";

type DarajaCallback = {
  Body?: {
    stkCallback?: {
      MerchantRequestID?: string;
      CheckoutRequestID?: string;
      ResultCode?: number;
      ResultDesc?: string;
      CallbackMetadata?: {
        Item?: Array<{
          Name: string;
          Value?: string | number;
        }>;
      };
    };
  };
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as DarajaCallback;
    const callback = payload.Body?.stkCallback;

    if (!callback?.CheckoutRequestID || typeof callback.ResultCode !== "number") {
      return NextResponse.json({ message: "Invalid mobile money callback payload." }, { status: 400 });
    }

    const status = callback.ResultCode === 0 ? "paid" : "failed";
    const receipt = callback.CallbackMetadata?.Item?.find((item) => item.Name === "MpesaReceiptNumber")?.Value;

    /*
      Production flow:
      1. Verify the callback is from the gateway using network controls and request metadata.
      2. Look up the order by CheckoutRequestID.
      3. Store ResultCode, ResultDesc, receipt number, paid amount, and phone number.
      4. Emit an order status event or notify the frontend through polling, SSE, or websockets.
      5. Return a 200 quickly so the gateway does not retry a processed callback.
    */

    return NextResponse.json({
      message: "Callback received.",
      checkoutRequestId: callback.CheckoutRequestID,
      merchantRequestId: callback.MerchantRequestID,
      status,
      receipt: receipt ?? null,
      resultDescription: callback.ResultDesc
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unable to process callback.",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
