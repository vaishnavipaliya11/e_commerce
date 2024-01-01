export type ProductType = {
  name: string;
  avatar: string;
  description: string;
  category: string;
  rating: string;
  highlights: string;
  price: number;
  id: string;
};

export interface CartItemType extends ProductType {
  cartQty: number;
}