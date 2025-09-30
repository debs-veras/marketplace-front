import { AddCartForm } from '../types/cart.d';
import {
  getRequest,
  postRequest,
  deleteRequest,
  patchRequest,
} from '../utils/axiosRequest';
export const getCartRequest = async () => {
  return await getRequest('cart');
};
export const postAddCartRequest = async (data: AddCartForm) => {
  return await postRequest('cart/add-product', data);
};
export const deleteCartProduct = async (productId: string) => {
  return await deleteRequest("cart/remove-product", { productId });
};
export const patchDecreaseQuantity = async (data: AddCartForm) => {
  return await patchRequest(`cart/decrease-quantity`, data);
};
