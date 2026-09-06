"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Loader2, MapPin, Smartphone, WalletCards } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatCurrency, normalizeKenyanPhone } from "@/lib/format";

type Step = "delivery" | "review" | "payment";
type PaymentStatus = "idle" | "loading" | "success" | "error";

type DeliveryForm = {
  name: string;
  phone: string;
  address: string;
  note: string;
};

const steps: Array<{ id: Step; label: string }> = [
  { id: "delivery", label: "Delivery" },
  { id: "review", label: "Review" },
  { id: "payment", label: "Payment" }
];

export function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("delivery");
  const [delivery, setDelivery] = useState<DeliveryForm>({
    name: "",
    phone: "",
    address: "",
    note: ""
  });
  const [paymentMethod, setPaymentMethod] = useState<"mobile-money" | "card">("mobile-money");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");

  const deliveryFee = subtotal > 0 ? 250 : 0;
  const total = subtotal + deliveryFee;
  const normalizedMobileNumber = useMemo(() => normalizeKenyanPhone(mobileNumber), [mobileNumber]);

  const handleDeliverySubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!delivery.name.trim() || !delivery.address.trim()) {
      setError("Please enter your name and delivery address.");
      return;
    }

    if (!normalizeKenyanPhone(delivery.phone)) {
      setError("Enter a valid Kenyan phone number such as 0712 345 678.");
      return;
    }

    setStep("review");
  };

  const handlePayment = async () => {
    setError("");

    if (items.length === 0) {
      setError("Add at least one pastry before starting checkout.");
      return;
    }

    if (paymentMethod !== "mobile-money") {
      setError("Only the Mobile Money route is implemented in this demo skeleton.");
      return;
    }

    if (!normalizedMobileNumber) {
      setError("Enter a valid mobile money number in +2547XXXXXXXX format.");
      return;
    }

    try {
      setPaymentStatus("loading");
      const response = await fetch("/api/payment/stk-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: normalizedMobileNumber,
          amount: total,
          order: {
            customer: delivery.name,
            deliveryPhone: normalizeKenyanPhone(delivery.phone),
            address: delivery.address,
            note: delivery.note,
            items: items.map((item) => ({
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              price: item.price
            }))
          }
        })
      });

      const data = (await response.json()) as { message?: string; checkoutRequestId?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Payment request failed. Please try again.");
      }

      await new Promise((resolve) => setTimeout(resolve, 2500));
      setPaymentStatus("success");
      clearCart();
    } catch (paymentError) {
      setPaymentStatus("error");
      setError(paymentError instanceof Error ? paymentError.message : "Something went wrong.");
    }
  };

  return (
    <section id="checkout" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_0.65fr]">
        <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-cocoa/10 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-berry">Checkout</p>
              <h2 className="mt-2 font-serif text-3xl font-black text-cocoa">Complete your order</h2>
            </div>
            <div className="grid grid-cols-3 rounded-lg bg-paper p-1">
              {steps.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStep(item.id)}
                  className={`rounded-md px-3 py-2 text-xs font-black sm:text-sm ${
                    step === item.id ? "bg-cocoa text-white" : "text-cocoa/65"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {error ? (
            <div className="mt-5 rounded-lg border border-berry/20 bg-berry/10 px-4 py-3 text-sm font-semibold text-berry">
              {error}
            </div>
          ) : null}

          {step === "delivery" ? (
            <form onSubmit={handleDeliverySubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-cocoa">
                  Full name
                  <input
                    value={delivery.name}
                    onChange={(event) => setDelivery({ ...delivery, name: event.target.value })}
                    className="rounded-lg border border-cocoa/15 px-4 py-3 font-medium"
                    placeholder="Amina Wanjiku"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-cocoa">
                  Delivery phone
                  <input
                    value={delivery.phone}
                    onChange={(event) => setDelivery({ ...delivery, phone: event.target.value })}
                    className="rounded-lg border border-cocoa/15 px-4 py-3 font-medium"
                    placeholder="0712 345 678"
                    inputMode="tel"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-bold text-cocoa">
                Delivery address
                <textarea
                  value={delivery.address}
                  onChange={(event) => setDelivery({ ...delivery, address: event.target.value })}
                  className="min-h-28 rounded-lg border border-cocoa/15 px-4 py-3 font-medium"
                  placeholder="Apartment, street, estate, building entrance notes"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-cocoa">
                Kitchen note
                <input
                  value={delivery.note}
                  onChange={(event) => setDelivery({ ...delivery, note: event.target.value })}
                  className="rounded-lg border border-cocoa/15 px-4 py-3 font-medium"
                  placeholder="Birthday message, slicing request, delivery window"
                />
              </label>
              <button className="inline-flex w-full items-center justify-center rounded-lg bg-berry px-4 py-3 text-sm font-bold text-white sm:w-auto sm:px-6">
                Review order
              </button>
            </form>
          ) : null}

          {step === "review" ? (
            <div className="mt-6 grid gap-4">
              <div className="rounded-lg bg-paper p-4">
                <div className="flex items-center gap-2 text-cocoa">
                  <MapPin size={20} />
                  <h3 className="font-black">Delivery details</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-cocoa/75">
                  {delivery.name || "Customer name"} &middot; {delivery.phone || "Delivery phone"}
                  <br />
                  {delivery.address || "No delivery address entered yet."}
                </p>
              </div>
              <div className="grid gap-3">
                {items.length === 0 ? (
                  <p className="rounded-lg bg-cream p-4 text-sm font-semibold text-cocoa">
                    Your cart is empty. Add pastries from the catalog before payment.
                  </p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex justify-between gap-4 rounded-lg border border-cocoa/10 p-4">
                      <div>
                        <p className="font-black text-cocoa">{item.name}</p>
                        <p className="text-sm text-cocoa/65">Qty {item.quantity}</p>
                      </div>
                      <p className="font-black text-cocoa">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))
                )}
              </div>
              <button
                type="button"
                onClick={() => setStep("payment")}
                className="inline-flex w-full items-center justify-center rounded-lg bg-berry px-4 py-3 text-sm font-bold text-white sm:w-auto sm:px-6"
              >
                Select payment
              </button>
            </div>
          ) : null}

          {step === "payment" ? (
            <div id="payment" className="mt-6 grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("mobile-money")}
                  className={`flex min-h-[88px] items-center gap-3 rounded-lg border p-4 text-left ${
                    paymentMethod === "mobile-money" ? "border-berry bg-berry/10" : "border-cocoa/10 bg-white"
                  }`}
                >
                  <Smartphone className="text-berry" />
                  <span>
                    <span className="block font-black text-cocoa">Mobile Money</span>
                    <span className="block text-sm text-cocoa/65">M-Pesa STK push prompt</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex min-h-[88px] items-center gap-3 rounded-lg border p-4 text-left ${
                    paymentMethod === "card" ? "border-berry bg-berry/10" : "border-cocoa/10 bg-white"
                  }`}
                >
                  <WalletCards className="text-cocoa/70" />
                  <span>
                    <span className="block font-black text-cocoa">Card</span>
                    <span className="block text-sm text-cocoa/65">Reserved for later</span>
                  </span>
                </button>
              </div>
              {paymentMethod === "mobile-money" ? (
                <label className="grid gap-2 text-sm font-bold text-cocoa">
                  Mobile money phone number
                  <input
                    value={mobileNumber}
                    onChange={(event) => setMobileNumber(event.target.value)}
                    className="rounded-lg border border-cocoa/15 px-4 py-3 font-medium"
                    placeholder="+254 712 345 678"
                    inputMode="tel"
                  />
                  <span className={normalizedMobileNumber ? "text-mint" : "text-cocoa/55"}>
                    {normalizedMobileNumber
                      ? `Will send prompt to ${normalizedMobileNumber}`
                      : "Use +2547XXXXXXXX, 07XXXXXXXX, or 7XXXXXXXX."}
                  </span>
                </label>
              ) : null}
              <button
                type="button"
                onClick={handlePayment}
                disabled={paymentStatus === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cocoa px-4 py-3 text-sm font-bold text-white transition hover:bg-berry disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-6"
              >
                {paymentStatus === "loading" ? <Loader2 className="animate-spin" size={18} /> : null}
                Pay {formatCurrency(total)}
              </button>
            </div>
          ) : null}
        </div>

        <aside className="h-fit rounded-lg bg-cocoa p-5 text-white shadow-soft">
          <h3 className="font-serif text-2xl font-black">Order summary</h3>
          <dl className="mt-5 grid gap-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-white/70">Subtotal</dt>
              <dd className="font-bold">{formatCurrency(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/70">Delivery</dt>
              <dd className="font-bold">{formatCurrency(deliveryFee)}</dd>
            </div>
            <div className="flex justify-between border-t border-white/15 pt-4 text-lg">
              <dt className="font-black">Total</dt>
              <dd className="font-black">{formatCurrency(total)}</dd>
            </div>
          </dl>
          <p className="mt-5 rounded-lg bg-white/10 p-4 text-sm leading-6 text-white/75">
            Mobile money requests are sent through the `/api/payment/stk-push` route. Replace the
            demo gateway values with secure environment variables before production.
          </p>
        </aside>
      </div>

      {paymentStatus === "loading" ? (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-cocoa/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-soft">
            <Loader2 className="mx-auto animate-spin text-berry" size={42} />
            <h3 className="mt-4 text-xl font-black text-cocoa">Please check your phone for the PIN prompt...</h3>
            <p className="mt-2 text-sm leading-6 text-cocoa/70">
              We are waiting for the payment gateway callback to confirm the transaction.
            </p>
          </div>
        </div>
      ) : null}

      {paymentStatus === "success" ? (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-cocoa/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-soft">
            <CheckCircle2 className="mx-auto text-mint" size={46} />
            <h3 className="mt-4 text-xl font-black text-cocoa">Payment request accepted</h3>
            <p className="mt-2 text-sm leading-6 text-cocoa/70">
              In production this state should update from the confirmed gateway callback status.
            </p>
            <button
              type="button"
              onClick={() => setPaymentStatus("idle")}
              className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-berry px-4 py-3 text-sm font-bold text-white"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
