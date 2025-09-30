import { ProductList } from './product';

export type AddCartForm = {
  productId: string;
  quantity: number;
};

export type CartItem = {
  product: ProductList;
  quantity: number;
  itemTotal: number;
};

export type Cart = {
  cartId: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
};
