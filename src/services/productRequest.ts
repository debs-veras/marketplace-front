import { deleteRequest, getRequest, postRequest, putRequest } from '../utils/axiosRequest';

export const postProductRequest = async (data: FormData) => {
  return await postRequest('products', data);
};

export const putProductRequest = async (id: string, data: FormData) => {
  return await putRequest(`products/${id}`, data);
};

export const getProductById = async (id: string) => {
  return await getRequest(`products/${id}`);
};

export const getListProduct = async (url: string) => {
  return await getRequest(`products/${url}`);
};

export const deleteProduct = async (id: string) => {
  return await deleteRequest(`/products/${id}`);
};
