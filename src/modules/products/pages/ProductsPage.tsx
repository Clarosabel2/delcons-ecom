import React, { useEffect, useState } from "react";

import { IProduct } from "../models/IProduct";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import CartPhone from "../../cart/components/CartPhone";
import {
    getAllProducts,
    getProductsByCategories,
} from "../services/products.service";
import ProductFilters from "../components/ProductFilters";
import { getCategoryList } from "../services/productService";
import StoreHeader from "../../store/components/StoreHeader";
import { useParams } from "react-router";

export default function ProductsPage() {
    const { storeId } = useParams();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [productsFiltered, setProductsFiltered] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setProducts(await getAllProducts());
                setCategories(await getCategoryList());
            } catch (err) {
                setError("Error al cargar productos");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    });

    useEffect(() => {
        if (categoriesSelected.length === 0) {
            setProductsFiltered(products);
        } else {
            const filtered = products.filter((product) =>
                categoriesSelected.includes(product.category)
            );
            setProductsFiltered(filtered);
        }
    }, [categoriesSelected]);

    if (loading) return <LoadingSpinner />;

    if (error) return <div>{error}</div>;

    return (
        <>
            {/* Se agrega pb-28 md:pb-8 para que el CartPhone en móviles no tape el último producto */}
            <div className="container px-4 py-8 pb-28 md:pb-8 mx-auto">

                <div className="flex flex-col gap-6 lg:px-8">
                    <div className="flex flex-col w-full gap-8 lg:flex-row">
                        {/* Panel de filtros */}
                        <aside className="w-full lg:w-64 shrink-0">
                            <ProductFilters
                                categories={categories}
                                categoriesSelected={categoriesSelected}
                                setCategoriesSelected={setCategoriesSelected}
                            />
                        </aside>

                        <main className="z-0 w-full flex-1">
                            <div className="relative grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                                {categoriesSelected.length === 0 ? (
                                    products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            storeId={storeId!}
                                        />
                                    ))
                                ) : productsFiltered && productsFiltered.length > 0 ? (
                                    productsFiltered.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            storeId={storeId!}
                                        />
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 w-full">
                                        No hay productos para mostrar.
                                    </p>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <CartPhone />
        </>
    );
}
