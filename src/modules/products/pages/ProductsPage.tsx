import React, { useEffect, useState } from "react";

import { IProduct } from "../models/IProduct";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import CartPhone from "../../cart/components/CartPhone";
import { getAllProducts } from "../services/products.service";
import ProductFilters from "../components/ProductFilters";
import { getCategoryList } from "../services/productService";

export default function ProductsPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);

    useEffect(() => {
        console.log(categoriesSelected);
    }, [categoriesSelected]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const resProducts = await getAllProducts();
                const resCategories = await getCategoryList();
                setProducts(resProducts);
                setCategories(resCategories);
            } catch (err) {
                setError("Error al cargar productos");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <LoadingSpinner />;

    if (error) return <div>{error}</div>;

    return (
        <>
            <div className="container px-4 py-8 mx-auto">
                {/* Header de la tienda */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Nuestra Tienda
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Encuentra los mejores productos al mejor precio
                    </p>
                </div>

                <div className="flex flex-col gap-6 ">
                    <div className="flex flex-col w-full gap-10 lg:flex-row">
                        {/* Panel de filtros */}
                        <aside className="w-full lg:w-1/4">
                            <ProductFilters
                                categories={categories}
                                categoriesSelected={categoriesSelected}
                                setCategoriesSelected={setCategoriesSelected}
                            />
                        </aside>

                        <main className="z-0 w-full lg:w-3/4">
                            <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <CartPhone />
        </>
    );
}
