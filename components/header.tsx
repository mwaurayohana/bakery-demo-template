"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/cart-context";

const navItems = [
  { label: "Catalog", href: "#catalog" },
  { label: "Delivery", href: "#checkout" },
  { label: "Mobile Money", href: "#payment" }
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-cocoa/10 bg-paper/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="flex min-h-11 items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-berry text-lg font-black text-white">
            W
          </span>
          <span>
            <span className="block font-serif text-xl font-bold leading-tight text-cocoa">
              Artisan & Co. Bakery
            </span>
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-berry">
              Fresh pastry
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-cocoa transition hover:bg-cream"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex size-11 items-center justify-center rounded-full bg-cocoa text-white transition hover:bg-berry"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-saffron text-xs font-bold text-cocoa">
                {itemCount}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-cocoa/15 bg-white text-cocoa md:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-cocoa/35 transition md:hidden ${
          isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <aside
          className={`ml-auto h-dvh w-[84vw] max-w-sm bg-paper p-5 shadow-soft transition-transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <span className="font-serif text-2xl font-bold text-cocoa">Menu</span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-full bg-white text-cocoa"
              aria-label="Close navigation menu"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="mt-8 grid gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg bg-white px-4 py-4 text-base font-semibold text-cocoa shadow-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </header>
  );
}
