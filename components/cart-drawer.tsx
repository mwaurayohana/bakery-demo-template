"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBasket, Trash2, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/format";

export function CartDrawer() {
  const { items, isCartOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();
  const deliveryEstimate = subtotal > 0 ? 250 : 0;
  const total = subtotal + deliveryEstimate;

  return (
    <div
      className={`fixed inset-0 z-50 bg-cocoa/40 transition ${
        isCartOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
      onClick={closeCart}
    >
      <aside
        className={`ml-auto flex h-dvh w-full max-w-md flex-col bg-paper shadow-soft transition-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(event) => event.stopPropagation()}
        aria-label="Shopping cart drawer"
      >
        <div className="flex items-center justify-between border-b border-cocoa/10 p-4">
          <div>
            <p className="text-sm font-bold text-berry">Your order</p>
            <h2 className="font-serif text-2xl font-black text-cocoa">Cart</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="inline-flex size-11 items-center justify-center rounded-full bg-white text-cocoa"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center">
            <div>
              <ShoppingBasket className="mx-auto text-berry" size={44} />
              <h3 className="mt-4 text-xl font-black text-cocoa">Your basket is empty</h3>
              <p className="mt-2 text-sm leading-6 text-cocoa/70">
                Add a tart, loaf, or cake and it will appear here instantly.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid gap-4">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-[84px_1fr] gap-3 rounded-lg bg-white p-3">
                    <div className="relative h-24 overflow-hidden rounded-md bg-cream">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        loading="lazy"
                        sizes="84px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-black leading-snug text-cocoa">{item.name}</h3>
                          <p className="mt-1 text-sm font-bold text-berry">{formatCurrency(item.price)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-cocoa/60 hover:bg-cream hover:text-berry"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="mt-3 inline-flex items-center rounded-full border border-cocoa/10 bg-paper">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="inline-flex size-11 items-center justify-center rounded-full text-cocoa"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center text-sm font-black text-cocoa">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="inline-flex size-11 items-center justify-center rounded-full text-cocoa"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-cocoa/10 bg-white p-4">
              <dl className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-cocoa/70">Subtotal</dt>
                  <dd className="font-bold text-cocoa">{formatCurrency(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-cocoa/70">Delivery estimate</dt>
                  <dd className="font-bold text-cocoa">{formatCurrency(deliveryEstimate)}</dd>
                </div>
                <div className="flex justify-between border-t border-cocoa/10 pt-3 text-base">
                  <dt className="font-black text-cocoa">Total</dt>
                  <dd className="font-black text-cocoa">{formatCurrency(total)}</dd>
                </div>
              </dl>
              <a
                href="#checkout"
                onClick={closeCart}
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-berry px-4 py-3 text-sm font-bold text-white transition hover:bg-cocoa"
              >
                Continue to checkout
              </a>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
