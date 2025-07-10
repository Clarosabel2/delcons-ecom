import React from "react";
import { IProduct } from "../models/IProduct";
import ProductRatingStar from "./ProductRatingStart";
import { useNavigate } from "react-router";
import { useCart } from "../../cart/hooks/useCart";
import { Item } from "../../cart/models/Cart";
import { FaCartPlus } from "react-icons/fa6";

interface ProductCardProps {
    product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    const navigate = useNavigate();
    const { cart, addItem } = useCart();

    const handleClick = () => {
        navigate(`/products/${product.id}`);
    };
    const existingItem = cart.items.find((i) => i.product.id === product.id);

    return (
        <div
            className="overflow-hidden transition-all duration-300 bg-white shadow-sm cursor-pointer group rounded-2xl lg:hover:shadow-xl active:shadow-none lg:hover:scale-105"
            onClick={handleClick}
        >
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="object-contain w-full h-full p-4 transition-all duration-300 
                    drop-shadow-[0px_4px_2px_rgba(0,0,0,0.9)]
                    group-hover:drop-shadow-[0px_3px_13px_rgba(33,33,33,0.6)]
                    group-hover:scale-110
                    "
                />

                {product.discountPercentage && (
                    <span className="absolute px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-full top-2 right-2">
                        {product.discountPercentage}% OFF
                    </span>
                )}
            </div>

            {/* Información del producto */}
            <div className="p-4">
                {/* Categoría y marca */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 capitalize">
                        {product.category}
                    </span>
                    {product.brand && (
                        <span className="text-xs font-medium text-gray-700">
                            {product.brand}
                        </span>
                    )}
                </div>

                {/* Nombre del producto */}
                <h3 className="mb-2 text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem]">
                    {product.title}
                </h3>

                {/* Rating */}
                {product.reviews!=null && product.reviews?.length > 0 ? (
                    <div className="flex items-center mb-3">
                        <ProductRatingStar
                            rate={product.rating ?? 0}
                            className="text-xs"
                        />
                        <span className="text-xs text-gray-500 hover:underline">
                            ({product.reviews.length})
                        </span>
                    </div>
                ) : (
                    <div className="text-xs text-gray-500 mb-3">
                        Sin opiniones
                    </div>
                )}

                {/* Precio y stock */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                                Stock: {product.stock}
                            </span>
                            {existingItem && (
                                <span className="text-xs font-medium text-blue-600">
                                    En carrito: {existingItem.quantity}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        className="p-2 text-white transition-all bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 hover:shadow-2xl hover:scale-110 active:scale-100"
                        onClick={(e) => {
                            e.stopPropagation();
                            addItem(new Item(1, product));
                        }}
                        disabled={existingItem?.quantity === product.stock}
                    >
                        <FaCartPlus className="text-xl" />
                    </button>
                </div>
            </div>
        </div>
    );
}
