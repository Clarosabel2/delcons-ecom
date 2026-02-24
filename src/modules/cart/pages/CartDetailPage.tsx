import React from "react";
import { FaTrash } from "react-icons/fa";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import QuantitySelector from "../../shared/components/QuantitySelector";
import ScrollToTop from "../../shared/utils/ScrollToTop";
import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart";
import clsx from "clsx";

export default function CartDetailPage() {
    const navigate = useNavigate();
    const { cart, clearCart, removeItem, updateItemQuantity } = useCart();

    return (
        <div className="min-h-screen bg-gray-50">
            <ScrollToTop />

            {/* Header / Title area */}
            <div className="bg-white border-b border-gray-100 pt-5 pb-6 px-4">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <button
                        onClick={() => navigate('/products')}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" /> Seguir comprando
                    </button>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Tu Carrito
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 mt-4">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Lista de productos */}
                    <div className="w-full lg:w-2/3">
                        {cart.items.length === 0 ? (
                            <div className="bg-white border border-gray-100 rounded-[2rem] p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <ShoppingBag className="w-12 h-12 text-gray-300" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
                                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                    Parece que aún no has agregado ningún producto. ¡Explora nuestro catálogo y encuentra lo que necesitas!
                                </p>
                                <button
                                    onClick={() => navigate('/products')}
                                    className="px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-transform"
                                >
                                    Ir a Productos
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {cart.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 transition-colors hover:border-gray-200 relative group"
                                    >
                                        {/* Imagen */}
                                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.title}
                                                className="object-contain w-full h-full p-2 group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>

                                        {/* Info & Quantity */}
                                        <div className="flex-1 flex flex-col gap-3 w-full">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <p className="text-[10px] font-bold tracking-wider text-blue-600 uppercase mb-1">
                                                        {item.product.category}
                                                    </p>
                                                    <h3 className="font-bold text-gray-900 text-base sm:text-lg line-clamp-2 leading-tight">
                                                        {item.product.title}
                                                    </h3>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <p className="font-extrabold text-gray-900 text-lg">
                                                        ${item.product.price}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50 sm:border-none sm:pt-0">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm font-medium text-gray-500 hidden sm:inline-block">
                                                        Cantidad:
                                                    </span>
                                                    <div className="bg-gray-50 rounded-lg p-1 border border-gray-100">
                                                        <QuantitySelector
                                                            className="h-8 border-none bg-transparent"
                                                            value={item.quantity}
                                                            onChange={(newQuantity) =>
                                                                updateItemQuantity(item.product.id, newQuantity)
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="text-right sm:hidden">
                                                        <span className="text-xs text-gray-400 block">Subtotal</span>
                                                        <span className="font-bold text-gray-900">${item.subtotal.toFixed(2)}</span>
                                                    </div>
                                                    <button
                                                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                        onClick={() => removeItem(item.product.id)}
                                                        title="Eliminar producto"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Resumen del pedido */}
                    <div className="w-full lg:w-1/3">
                        <div className="lg:sticky lg:top-28 bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100 p-6 sm:p-8 flex flex-col h-fit">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                                Resumen del Pedido
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center text-gray-600 font-medium text-sm sm:text-base">
                                    <span>Subtotal ({cart.items.length} {cart.items.length === 1 ? 'item' : 'items'})</span>
                                    <span className="text-gray-900">${cart.amount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600 font-medium text-sm sm:text-base">
                                    <span>Costo de envío</span>
                                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md text-xs sm:text-sm">Gratis</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 mb-8">
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-500 font-medium">Total a pagar</span>
                                    <div className="text-right">
                                        <span className="text-sm font-bold text-gray-400 block leading-none mb-1">ARS</span>
                                        <span className="text-3xl font-extrabold text-gray-900 leading-none">
                                            ${cart.amount.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 mt-auto">
                                <button
                                    className={clsx(
                                        "w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2",
                                        cart.items.length === 0
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:scale-95"
                                    )}
                                    disabled={cart.items.length === 0}
                                    onClick={() => navigate("/checkout")}
                                >
                                    Proceder al pago
                                </button>

                                <button
                                    onClick={() => {
                                        if (window.confirm('¿Seguro que deseas vaciar todo el carrito?')) {
                                            clearCart();
                                        }
                                    }}
                                    className={clsx(
                                        "w-full py-3 px-6 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-sm",
                                        cart.items.length === 0
                                            ? "text-gray-300 cursor-not-allowed"
                                            : "text-rose-600 hover:bg-rose-50"
                                    )}
                                    disabled={cart.items.length === 0}
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Vaciar todo el carrito
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
