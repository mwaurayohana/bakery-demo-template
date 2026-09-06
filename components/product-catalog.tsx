"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { categories, products } from "@/data/products";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/format";
import type { ProductCategory, SortOption } from "@/types/product";

export function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | ProductCategory>("All");
  const [sort, setSort] = useState<SortOption>("featured");
  const { addItem } = useCart();

  const visibleProducts = useMemo(() => {
    const filtered =
      selectedCategory === "All"
        ? products
        : products.filter((product) => product.category === selectedCategory);

    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return products.findIndex((item) => item.id === a.id) - products.findIndex((item) => item.id === b.id);
    });
  }, [selectedCategory, sort]);

  return (
    <section id="catalog" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-berry">Catalog</p>
          <h2 className="mt-2 font-serif text-3xl font-black text-cocoa sm:text-4xl">
            Choose your bake
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] md:min-w-[460px]">
          <div className="flex gap-2 overflow-x-auto rounded-lg bg-white p-1 shadow-sm no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-md px-4 py-2 text-sm font-bold transition ${
                  selectedCategory === category
                    ? "bg-cocoa text-white"
                    : "text-cocoa hover:bg-cream"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="relative flex items-center rounded-lg bg-white shadow-sm">
            <SlidersHorizontal className="pointer-events-none absolute left-3 text-cocoa/55" size={18} />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="w-full appearance-none rounded-lg border border-transparent bg-transparent py-3 pl-10 pr-9 text-sm font-bold text-cocoa"
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleProducts.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-cocoa/10">
            <div className="relative aspect-[4/3] overflow-hidden bg-cream">
              <Image
                src={product.image}
                alt={product.name}
                fill
                loading="lazy"
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
              {product.badge ? (
                <span className="absolute left-3 top-3 rounded-full bg-saffron px-3 py-1 text-xs font-black text-cocoa">
                  {product.badge}
                </span>
              ) : null}
            </div>
            <div className="flex min-h-[238px] flex-col p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-berry">
                    {product.category}
                  </p>
                  <h3 className="mt-1 text-lg font-black leading-snug text-cocoa">{product.name}</h3>
                </div>
                <p className="shrink-0 text-base font-black text-cocoa">{formatCurrency(product.price)}</p>
              </div>
              <p className="mt-3 flex-1 text-sm leading-6 text-cocoa/70">{product.description}</p>
              <button
                type="button"
                onClick={() => addItem(product)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-cocoa px-4 py-3 text-sm font-bold text-white transition hover:bg-berry"
              >
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
