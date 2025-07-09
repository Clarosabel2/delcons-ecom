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
            }, 200);
        }, 100);
    };
    return (
        <div
            className={clsx("relative flex", {
                "animate-vertical-bounce": isAddItem,
            })}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={clsx({ "animate-jelly": isAddItem })}>
                <LinkAnimated href="/cart">
                    <div className="relative flex">
                        <CiShoppingCart className="mr-1 text-4xl" />
                        <div className="absolute flex items-center justify-center w-full h-full">
                            <NumberFlow value={cart.items.length} />
                        </div>
                    </div>
                </LinkAnimated>
            </div>

            {isVisible && (
                <div
                    className={`absolute right-0 z-50 flex flex-col h-auto gap-2 p-2 mt-2 transition-all duration-300 bg-white shadow-2xl cursor-default w-80 top-full rounded-xl border-1 border-gray-300 
                    ${isHovered ? "animate-fade-in" : "animate-fade-out"}`}
                >
                    <div className="flex items-center justify-between w-full px-5">
                        <p className="self-center mb-2 text-xl font-semibold text-center text-gray-700">
                            Tu carrito
                        </p>
                        <Link
                            to="/cart"
                            className="text-xs hover:underline hover:text-blue-600"
                        >
                            Ver carrito
                        </Link>
                    </div>
                    <div className="space-y-2 overflow-y-auto text-sm text-gray-600 max-h-72">
                        {cart.items.length === 0 ? (
                            <p className="text-center">
                                No hay productos en el carrito.
                            </p>
                        ) : (
                            cart.items.map((i) => (
                                <CartItem item={i}></CartItem>
                            ))
                        )}
                    </div>
                    <div className="flex items-center justify-between w-full px-4 py-2 text-black bg-gray-200 rounded-md shadow">
                        <span className="font-semibold">Total:</span>
                        <span className="text-lg font-semibold">
                            $
                            <NumberFlow
                                value={Number(cart.amount.toFixed(2))}
                            />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
