import React from "react";
import { FaTrash } from "react-icons/fa";
import QuantitySelector from "../../shared/components/QuantitySelector";
import ScrollToTop from "../../shared/utils/ScrollToTop";
import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart";

export default function CartDetailPage() {
    const navigate = useNavigate();
    const { cart, clearCart, removeItem, updateItemQuantity } = useCart();
    return (
        <>
            <ScrollToTop />
            <div className="min-h-screen bg-gray-50">
                <div className="container px-4 py-8 mx-auto">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">
                        Tu Carrito
                    </h1>

                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Lista de productos */}
                        <div className="w-full lg:w-2/3">
                            <div className="p-6 bg-white rounded-lg shadow">
                                {cart.items.length === 0 ? (
                                    <div className="text-center">
                                        <p className="text-lg text-gray-600">
                                            Tu carrito está vacío
                                        </p>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Agrega algunos productos para
                                            comenzar
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cart.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between p-4 border border-gray-300 rounded-lg"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={item.product.images[0]}
                                                        alt={item.product.title}
                                                        className="object-contain w-20 h-20"
                                                    />
                                                    <div>
                                                        <h3 className="font-medium">
                                                            {item.product.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            $
                                                            {item.product.price}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Subtotal: $
                                                            {item.subtotal.toFixed(
                                                                2
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <QuantitySelector
                                                            className="lg:h-9 lg:w-9"
                                                            value={
                                                                item.quantity
                                                            }
                                                            onChange={(
                                                                newQuantity
                                                            ) =>
                                                                updateItemQuantity(
                                                                    item.product
                                                                        .id,
                                                                    newQuantity
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <button
                                                        className="p-2 text-red-500 border rounded hover:bg-red-50"
                                                        onClick={() =>
                                                            removeItem(
                                                                item.product.id
                                                            )
                                                        }
                                                    >
                                                        <FaTrash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Resumen del pedido */}
                        <div className="w-full lg:w-1/3">
                            <div className="sticky p-6 bg-white rounded-lg shadow top-4">
                                <h2 className="mb-4 text-xl font-semibold">
                                    Resumen del pedido
                                </h2>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${cart.amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Envío</span>
                                        <span>Gratis</span>
                                    </div>
                                    <div className="pt-3 mt-3 border-t">
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span>Total</span>
                                            <span>
                                                ${cart.amount.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="w-full px-4 py-3 mt-6 text-white transition-colors bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700"
                                    disabled={cart.items.length === 0}
                                    onClick={() => navigate("/checkout")}
                                >
                                    Proceder al pago
                                </button>

                                <button
                                    onClick={clearCart}
                                    className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 text-red-600 transition-colors border border-red-600 rounded-lg cursor-pointer hover:bg-red-50"
                                    disabled={cart.items.length === 0}
                                >
                                    <FaTrash className="w-4 h-4" />
                                    <span>Vaciar carrito</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
