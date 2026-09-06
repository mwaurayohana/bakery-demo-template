import Image from "next/image";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_0.9fr] md:items-center md:py-16 lg:px-8">
      <div>
        <p className="mb-3 inline-flex rounded-full bg-mint/20 px-4 py-2 text-sm font-bold text-cocoa">
          Baked daily in small batches
        </p>
        <h1 className="font-serif text-4xl font-black leading-[1.05] text-cocoa sm:text-5xl lg:text-7xl">
          Pastries worth pausing for.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-cocoa/75 sm:text-lg">
          Order celebration cakes, flaky pastries, and slow-fermented breads with checkout designed
          for fast mobile money payment.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href="#catalog"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-berry px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-cocoa"
          >
            Shop pastries
          </a>
          <a
            href="#checkout"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-cocoa/20 bg-white px-6 py-3 text-sm font-bold text-cocoa transition hover:bg-cream"
          >
            Start checkout
          </a>
        </div>
      </div>

      <div className="relative min-h-[320px] overflow-hidden rounded-lg shadow-soft sm:min-h-[420px]">
        <Image
          src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=1400&q=85"
          alt="Fresh pastries on a bakery counter"
          fill
          priority
          sizes="(min-width: 768px) 46vw, 100vw"
          className="object-cover"
        />
        <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/90 p-4 backdrop-blur">
          <p className="text-sm font-bold text-berry">Today&apos;s kitchen note</p>
          <p className="mt-1 text-sm leading-6 text-cocoa/75">
            Orders before 3 PM qualify for same-day rider delivery within central Nairobi.
          </p>
        </div>
      </div>
    </section>
  );
}
