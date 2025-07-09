import { IProduct } from "./IProduct";

export interface ProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}