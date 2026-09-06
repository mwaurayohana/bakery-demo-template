import { CartDrawer } from "@/components/cart-drawer";
import { Checkout } from "@/components/checkout";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProductCatalog } from "@/components/product-catalog";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductCatalog />
        <Checkout />
      </main>
      <SiteFooter />
      <CartDrawer />
    </>
  );
}
