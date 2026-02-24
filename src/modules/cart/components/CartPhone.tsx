import React, { useState, useEffect } from "react";
import { SlArrowUp } from "react-icons/sl";
import { FiShoppingCart, FiShoppingBag } from "react-icons/fi";
import CartItem from "./CartItem";
import NumberFlow from "@number-flow/react";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart";

export default function CartPhone() {
    const { cart } = useCart();
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const toggleCart = () => setExpanded((prev) => !prev);
    useEffect(() => {
        if (expanded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [expanded]);

    return (
        <div className="lg:hidden">
            {/* Backdrop overlay */}
            <div
                className={clsx(
                    "fixed inset-0 z-30 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300",
                    expanded ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setExpanded(false)}
            />

            {/* Bottom Sheet Cart */}
            <div
                className={clsx(
                    "fixed bottom-0 left-0 right-0 w-full bg-white z-40 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col md:max-w-md md:left-auto md:right-6 md:rounded-3xl md:bottom-6 md:border md:border-gray-100"
                )}
            >
                {/* Header (Always Visible) */}
                <div
                    className="relative flex items-center justify-between px-6 h-[85px] cursor-pointer touch-none bg-white rounded-t-3xl md:rounded-3xl"
                    onClick={toggleCart}
                >
                    {/* Drag Handle */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 rounded-full md:hidden" />

                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                        <div className="relative flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl">
                            <FiShoppingCart className="text-xl" />
                            {cart.items.length > 0 && (
                                <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[22px] h-[22px] px-1 text-[11px] font-bold text-white bg-rose-500 rounded-full border-2 border-white shadow-sm">
                                    {cart.items.length}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-lg font-bold text-gray-900 leading-tight">
                                Mi Carrito
                            </h2>
                            <p className="text-xs font-medium text-gray-500">
                                {cart.items.length} {cart.items.length === 1 ? 'producto' : 'productos'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-2 md:mt-0">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Total</span>
                            <div className="flex items-baseline gap-0.5">
                                <span className="text-sm font-bold text-gray-900">$</span>
                                <span className="text-lg font-black text-gray-900 tracking-tight">
                                    <NumberFlow value={Number(cart.amount.toFixed(2))} />
                                </span>
                            </div>
                        </div>
                        <div className={clsx(
                            "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                            expanded ? "bg-blue-50 text-blue-600 rotate-180" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                        )}>
                            <SlArrowUp className="text-sm stroke-[2]" />
                        </div>
                    </div>
                </div>

                {/* Expandable Content Area */}
                <div
                    className={clsx(
                        "flex flex-col bg-gray-50/50 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                        expanded ? "max-h-[75vh]" : "max-h-0"
                    )}
                >
                    <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0 max-h-[55vh] custom-scrollbar">
                        {cart.items.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {cart.items.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-48 text-center text-gray-500">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <FiShoppingBag className="text-2xl text-gray-400" />
                                </div>
                                <p className="text-base font-medium text-gray-900 mb-1">Tu carrito está vacío</p>
                                <p className="text-sm text-gray-500">Agrega productos para comenzar</p>
                            </div>
                        )}
                    </div>

                    {/* Footer / Checkout Button */}
                    <div className="p-4 bg-white border-t border-gray-100 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] pb-6 sm:pb-4">
                        <div className="flex justify-between items-end mb-4 sm:hidden">
                            <span className="text-sm font-bold text-gray-500">Total a pagar:</span>
                            <div className="flex items-baseline gap-0.5">
                                <span className="text-base font-bold text-gray-900">$</span>
                                <span className="text-2xl font-black text-blue-600 tracking-tight">
                                    <NumberFlow value={Number(cart.amount.toFixed(2))} />
                                </span>
                            </div>
                        </div>
                        <button
                            className={clsx(
                                "w-full py-4 rounded-2xl text-base font-bold transition-all duration-300 flex items-center justify-center gap-2 outline-none",
                                cart.items.length > 0
                                    ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-500/30"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            )}
                            onClick={() => {
                                if (cart.items.length > 0) {
                                    setExpanded(false);
                                    navigate("/checkout");
                                }
                            }}
                            disabled={cart.items.length === 0}
                        >
                            <span>Ir al Checkout</span>
                            {cart.items.length > 0 && (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}