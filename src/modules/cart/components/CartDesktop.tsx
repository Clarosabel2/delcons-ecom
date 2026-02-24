import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../hooks/useCart";
import NumberFlow from "@number-flow/react";
import CartItem from "./CartItem";
import clsx from "clsx";
import LinkAnimated from "../../shared/components/LinkAnimated";
import { CiShoppingCart } from "react-icons/ci";

export default function CartDesktop() {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const { cart, isAddItem } = useCart();

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsHovered(true);
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
            timeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 300); // 300ms to allow tailwind transition to finish
        }, 100);
    };

    return (
        <div
            className={clsx("relative flex items-center h-full", {
                "animate-vertical-bounce": isAddItem,
            })}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={clsx("flex items-center", { "animate-jelly": isAddItem })}>
                <LinkAnimated href="/cart">
                    <div className="relative flex items-center justify-center w-11 h-11 rounded-full transition-colors hover:bg-blue-50/80 group">
                        <CiShoppingCart className="text-[30px] text-gray-700 group-hover:text-blue-600 transition-colors" />
                        {cart.items.length > 0 && (
                            <div className="absolute top-0 right-0 flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[11px] font-bold text-white bg-rose-500 rounded-full border-2 border-white shadow-sm ring-1 ring-white/20">
                                <NumberFlow value={cart.items.length} />
                            </div>
                        )}
                    </div>
                </LinkAnimated>
            </div>

            {isVisible && (
                <div
                    className={clsx(
                        "absolute right-0 top-[calc(100%+0.5rem)] z-50 w-80 lg:w-96 flex flex-col gap-3 p-4",
                        "bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl shadow-blue-900/10 rounded-[1.5rem]",
                        "transition-all duration-300 ease-out origin-top-right",
                        isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    )}
                >
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            Mi Carrito
                            <span className="bg-blue-100 text-blue-700 text-xs py-0.5 px-2. rounded-full font-semibold">
                                {cart.items.length} {cart.items.length === 1 ? "ítem" : "ítems"}
                            </span>
                        </p>
                        <Link
                            to="/cart"
                            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Ver todo
                        </Link>
                    </div>

                    <div className="flex flex-col gap-3 overflow-y-auto max-h-[60vh] custom-scrollbar pr-1">
                        {cart.items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                                <CiShoppingCart className="text-5xl mb-2 opacity-50" />
                                <p className="text-sm font-medium">Tu carrito está vacío</p>
                            </div>
                        ) : (
                            cart.items.map((i) => (
                                <CartItem key={i.product.id} item={i} />
                            ))
                        )}
                    </div>

                    {cart.items.length > 0 && (
                        <div className="pt-3 border-t border-gray-100 mt-1">
                            <div className="flex items-center justify-between mb-4 px-1">
                                <span className="text-gray-500 font-medium">Subtotal</span>
                                <span className="text-xl font-extrabold text-gray-900">
                                    $
                                    <NumberFlow
                                        value={Number(cart.amount.toFixed(2))}
                                    />
                                </span>
                            </div>
                            <Link
                                to="/cart"
                                className="flex items-center justify-center w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                            >
                                Finalizar Compra
                            </Link>
                        </div>
                    )}
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </div>
    );
}
