import React, { useEffect, useState } from "react";

import { IProduct } from "../models/IProduct";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import CartPhone from "../../cart/components/CartPhone";
import { getAllProducts } from "../services/products.service";

export default function ProductsPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getAllProducts();
                
                setProducts(res);
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
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {Array.isArray(products) &&
                products.map((p) => <ProductCard product={p} />)}
            <CartPhone />
        </section>
    );
}
