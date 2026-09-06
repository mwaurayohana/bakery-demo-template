import type { Product, ProductCategory } from "@/types/product";

export const categories: Array<"All" | ProductCategory> = ["All", "Cakes", "Pastries", "Bread"];

export const products: Product[] = [
  {
    id: "salted-caramel-layer-cake",
    name: "Salted Caramel Layer Cake",
    category: "Cakes",
    description: "Vanilla sponge layered with caramel cream, roasted pecans, and sea salt.",
    price: 3800,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
    badge: "Best seller"
  },
  {
    id: "raspberry-opera-slice",
    name: "Raspberry Opera Slice",
    category: "Cakes",
    description: "Almond sponge, berry ganache, espresso buttercream, and dark chocolate glaze.",
    price: 620,
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "lemon-poppy-mini-loaf",
    name: "Lemon Poppy Mini Loaf",
    category: "Bread",
    description: "Bright lemon loaf with poppy seeds, citrus syrup, and a soft sugar crust.",
    price: 480,
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1200&q=80",
    badge: "Morning pick"
  },
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    category: "Pastries",
    description: "Hand-laminated pastry with honeycomb layers and a golden flaky shell.",
    price: 260,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "cardamom-cinnamon-roll",
    name: "Cardamom Cinnamon Roll",
    category: "Pastries",
    description: "Soft enriched dough swirled with cinnamon, cardamom, and brown sugar glaze.",
    price: 340,
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "seeded-sourdough-boule",
    name: "Seeded Sourdough Boule",
    category: "Bread",
    description: "Slow-fermented country loaf with sesame, flax, pumpkin seeds, and a chewy crust.",
    price: 780,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "mango-passion-tart",
    name: "Mango Passion Tart",
    category: "Pastries",
    description: "Crisp tart shell filled with mango curd, passion fruit gel, and vanilla cream.",
    price: 520,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
    badge: "Seasonal"
  },
  {
    id: "chocolate-babka",
    name: "Chocolate Babka",
    category: "Bread",
    description: "Braided brioche with dark chocolate ribbons, cocoa crumble, and orange zest.",
    price: 920,
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=1200&q=80"
  }
];
