import api from "../../core/services/api";
import capitalize from "../../shared/utils/stringUtils";
import { IProduct } from "../models/IProduct";
import { ProductsResponse } from "../models/ProductsResponse";

export const getAllProducts = () => api.get<ProductsResponse>("/products");

export const getProductById = (idProduct: string) =>
    api.get<IProduct>(`/products/${idProduct}`);

export const createProduct = (product: Omit<IProduct, "id">) =>
    api.post("/products/add");

export const updateProduct = (idProduct: number, product: Partial<IProduct>) =>
    api.put(`/products/${idProduct}`);

export const deleteProductById = (idProduct: number) => api.delete("/products");
export const getCategoryList = async () => {
    const response = await api.get<string[]>("products/category-list");
    return response.data.map(capitalize);
};