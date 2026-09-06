export type ProductCategory = "Cakes" | "Pastries" | "Bread";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  image: string;
  badge?: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type SortOption = "featured" | "price-asc" | "price-desc";
