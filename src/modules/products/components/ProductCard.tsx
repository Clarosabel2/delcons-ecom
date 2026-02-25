import React from "react";
import { IProduct } from "../models/IProduct";
import ProductRatingStar from "./ProductRatingStart";
import { useNavigate } from "react-router";
import { useCart } from "../../cart/hooks/useCart";
import { Item } from "../../cart/models/Cart";
import { FaCartPlus } from "react-icons/fa6";
import clsx from "clsx";

interface ProductCardProps {
    product: IProduct;
    storeId: string;
}

export default function ProductCard({ product, storeId }: ProductCardProps) {
    const navigate = useNavigate();
    const { cart, addItem } = useCart();

    const handleClick = () => {
        navigate(`/${storeId}/products/${product.id}`);
    };
    const existingItem = cart.items.find((i) => i.product.id === product.id);

    return (
        <div
            className="group relative flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
            onClick={handleClick}
        >
            {/* Image Container */}
            <div className="relative h-40 w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center p-4">
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className="object-contain w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110 drop-shadow-md group-hover:drop-shadow-xl"
                />

                {/* Overlay gradient for premium feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* In Cart Badge */}
                {existingItem && (
                    <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg shadow-blue-500/30 tracking-wider z-10">
                        <FaCartPlus className="w-2 h-2" />
                        <span>En carrito ({existingItem.quantity})</span>
                    </div>
                )}

                {/* Discount Badge */}
                {product.discountPercentage && (
                    <div className="absolute top-4 right-4 bg-rose-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-rose-500/30 tracking-wider z-10">
                        -{Math.round(product.discountPercentage)}%
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="flex flex-col flex-1 p-4 relative">
                {/* Brand & Category */}
                <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2.5 py-1 rounded-md">
                        {product.category}
                    </span>
                    {product.brand && (
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest line-clamp-1 text-right">
                            {product.brand}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-gray-800 leading-snug mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors duration-300">
                    {product.title}
                </h3>

                {/* Rating */}
                {product.reviews != null && product.reviews?.length > 0 ? (
                    <div className="flex items-center gap-1.5 mb-4">
                        <ProductRatingStar
                            rate={product.rating ?? 0}
                            className="text-[13px] text-amber-400"
                        />
                        <span className="text-[11px] font-medium text-gray-400 mt-0.5">
                            ({product.reviews.length} reviews)
                        </span>
                    </div>
                ) : (
                    <div className="text-[11px] font-medium text-gray-400 mb-4 bg-gray-50 inline-block px-2 py-0.5 rounded-md mt-0.5">
                        Sin opiniones
                    </div>
                )}

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-end justify-between">
                    {/* Price & Stock */}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-[10px] font-bold text-gray-400 align-top mt-1">$</span>
                            <span className="text-lg font-extrabold text-gray-900 tracking-tight">
                                {product.price}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={clsx(
                                "text-[11px] font-medium flex items-center gap-1",
                                (product.stock ?? 0) > 0 ? "text-emerald-600" : "text-rose-500"
                            )}>
                                <span className={clsx(
                                    "w-1.5 h-1.5 rounded-full inline-block",
                                    (product.stock ?? 0) > 0 ? "bg-emerald-500" : "bg-rose-500"
                                )} />
                                {(product.stock ?? 0) > 0 ? `Stock: ${product.stock}` : "Agotado"}
                            </span>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        className={clsx(
                            "relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 transform outline-none",
                            (product.stock ?? 0) === 0 || existingItem?.quantity === product.stock
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gray-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-95 active:shadow-sm"
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            if ((product.stock ?? 0) > 0 && existingItem?.quantity !== product.stock) {
                                addItem(new Item(1, product));
                            }
                        }}
                        disabled={(product.stock ?? 0) === 0 || existingItem?.quantity === product.stock}
                        title={(product.stock ?? 0) === 0 ? "Sin stock" : "Añadir al carrito"}
                    >
                        <FaCartPlus className="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    );
}
