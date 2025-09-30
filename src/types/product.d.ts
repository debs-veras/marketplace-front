export type ProductForm = {
  name: string;
  description: string;
  image: FileList;
  price: number;
};
export type ProductList = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductFilter = {
  page: number;
  limit: number;
  name?: string;
  description?: string;
  price?: number;
};
