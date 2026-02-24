import React, { useState } from "react";
import { Link } from "react-router";
import {
    MapPin,
    CreditCard,
    ShieldCheck,
    Truck,
    ChevronRight,
    CheckCircle2,
    Lock
} from "lucide-react";
import { useCart } from "../../cart/hooks/useCart";
import clsx from "clsx";

export default function CheckoutPage() {
    const { cart } = useCart();
    const [step, setStep] = useState<1 | 2>(1); // 1 = Envío, 2 = Pago
    const [selectedShipping, setSelectedShipping] = useState("express");
    const [paymentMethod, setPaymentMethod] = useState("credit");

    const subtotal = cart?.amount || 0;
    const shippingCost = selectedShipping === "express" ? 6500 : 0;
    const total = subtotal + shippingCost;

    return (
        <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10 mt-6 relative z-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Finalizar Compra
                    </h1>
                    <p className="text-gray-500 font-medium mt-2 flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4 text-emerald-500" />
                        Proceso de pago seguro y encriptado
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column (Forms) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Progressive Navigation */}
                        <div className="flex items-center justify-between relative mb-8 px-4">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
                            <div className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -z-10 -translate-y-1/2 rounded-full transition-all duration-500" style={{ width: step === 2 ? '100%' : '50%' }}></div>

                            <button
                                onClick={() => setStep(1)}
                                className={clsx(
                                    "flex flex-col items-center gap-2 transition-all group",
                                    step === 1 ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
                                )}
                            >
                                <div className={clsx(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm ring-4 ring-slate-50",
                                    step === 1 ? "bg-blue-600 text-white shadow-blue-500/30" : "bg-white border-2 border-gray-200 text-gray-500 group-hover:border-blue-300 group-hover:bg-blue-50"
                                )}>
                                    1
                                </div>
                                <span className="font-bold text-sm bg-slate-50 px-2 rounded-lg">Datos de Envío</span>
                            </button>

                            <button
                                onClick={() => step === 2 ? setStep(2) : null} // Allow clicking 2 only if form 1 is somewhat done, but for mock keep it free or restricted
                                className={clsx(
                                    "flex flex-col items-center gap-2 transition-all",
                                    step === 2 ? "text-blue-600" : "text-gray-400"
                                )}
                            >
                                <div className={clsx(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ring-4 ring-slate-50",
                                    step === 2 ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-white border-2 border-gray-200 text-gray-400"
                                )}>
                                    2
                                </div>
                                <span className="font-bold text-sm bg-slate-50 px-2 rounded-lg">Pago</span>
                            </button>
                        </div>

                        {/* Step 1: Shipping */}
                        {step === 1 && (
                            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/40 border border-gray-100 animate-fade-in-modal">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                    Información de Envío
                                </h2>

                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Nombre</label>
                                            <input type="text" placeholder="Juan Pérez" className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-medium text-sm transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Teléfono</label>
                                            <input type="tel" placeholder="+54 9 11 1234 5678" className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-medium text-sm transition-all" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Dirección Completa</label>
                                            <input type="text" placeholder="Av. Corrientes 1234, Depto 5A" className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-medium text-sm transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Provincia</label>
                                            <select className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-medium text-gray-700 text-sm transition-all cursor-pointer">
                                                <option>CABA</option>
                                                <option>Buenos Aires</option>
                                                <option>Córdoba</option>
                                                <option>Santa Fe</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Ciudad / Barrio</label>
                                            <input type="text" placeholder="Palermo" className="w-full px-4 py-3 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-medium text-sm transition-all" />
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <h3 className="text-sm font-bold text-gray-900 mb-4">Método de Envío</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <label className={clsx(
                                                "border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-start gap-4",
                                                selectedShipping === "standard"
                                                    ? "border-blue-600 bg-blue-50/30"
                                                    : "border-gray-200 hover:border-blue-300"
                                            )}>
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    value="standard"
                                                    checked={selectedShipping === "standard"}
                                                    onChange={() => setSelectedShipping("standard")}
                                                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                />
                                                <div className="flex-1">
                                                    <span className="block font-bold text-gray-900">Envío Estándar</span>
                                                    <span className="block text-xs font-medium text-gray-500 mt-1">3 a 5 días hábiles</span>
                                                    <span className="block text-sm font-bold text-emerald-600 mt-2">Gratis</span>
                                                </div>
                                            </label>

                                            <label className={clsx(
                                                "border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-start gap-4",
                                                selectedShipping === "express"
                                                    ? "border-blue-600 bg-blue-50/30"
                                                    : "border-gray-200 hover:border-blue-300"
                                            )}>
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    value="express"
                                                    checked={selectedShipping === "express"}
                                                    onChange={() => setSelectedShipping("express")}
                                                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                />
                                                <div className="flex-1">
                                                    <span className="block font-bold text-gray-900">Envío Express</span>
                                                    <span className="block text-xs font-medium text-gray-500 mt-1">Llega mañana</span>
                                                    <span className="block text-sm font-bold text-gray-900 mt-2">$6.500</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="pt-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5"
                                        >
                                            Continuar al Pago
                                            <ChevronRight className="w-4 h-4 ml-2" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Step 2: Payment */}
                        {step === 2 && (
                            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/40 border border-gray-100 animate-fade-in-modal">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                                    <CreditCard className="w-5 h-5 text-indigo-600" />
                                    Método de Pago
                                </h2>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <label className={clsx(
                                            "border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-center gap-4",
                                            paymentMethod === "credit"
                                                ? "border-blue-600 bg-blue-50/30 ring-4 ring-blue-500/10"
                                                : "border-gray-200 hover:border-blue-300"
                                        )}>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="credit"
                                                checked={paymentMethod === "credit"}
                                                onChange={() => setPaymentMethod("credit")}
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <div className="flex items-center gap-3">
                                                <CreditCard className={clsx("w-6 h-6", paymentMethod === "credit" ? "text-blue-600" : "text-gray-400")} />
                                                <span className="font-bold text-sm text-gray-900">Tarjeta de Crédito</span>
                                            </div>
                                        </label>

                                        <label className={clsx(
                                            "border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-center gap-4",
                                            paymentMethod === "mercadopago"
                                                ? "border-blue-600 bg-blue-50/30 ring-4 ring-blue-500/10"
                                                : "border-gray-200 hover:border-blue-300"
                                        )}>
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="mercadopago"
                                                checked={paymentMethod === "mercadopago"}
                                                onChange={() => setPaymentMethod("mercadopago")}
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <div className="flex items-center gap-3">
                                                <div className={clsx("w-6 h-6 rounded-md bg-[#009EE3] flex items-center justify-center text-[10px] font-bold text-white", paymentMethod !== "mercadopago" && "grayscale opacity-50")}>
                                                    MP
                                                </div>
                                                <span className="font-bold text-sm text-gray-900">Mercado Pago</span>
                                            </div>
                                        </label>
                                    </div>

                                    {paymentMethod === "credit" && (
                                        <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100 space-y-4 animate-fade-in-modal">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Número de la tarjeta</label>
                                                <div className="relative">
                                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-medium text-sm transition-all shadow-sm" />
                                                    <CreditCard className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Vencimiento</label>
                                                    <input type="text" placeholder="MM/AA" className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-medium text-sm transition-all shadow-sm text-center" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">CVV / CVC</label>
                                                    <input type="text" placeholder="123" className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-medium text-sm transition-all shadow-sm text-center" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Nombre en la tarjeta</label>
                                                <input type="text" placeholder="Juan Pérez" className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 font-medium text-sm transition-all shadow-sm" />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                                        >
                                            Volver a Envío
                                        </button>
                                        <button className="inline-flex items-center px-8 py-3.5 border border-transparent text-sm font-extrabold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.28)] hover:-translate-y-1">
                                            <ShieldCheck className="w-5 h-5 mr-2" />
                                            Pagar ${total.toLocaleString("es-AR")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl shadow-gray-200/40 border border-gray-100 sticky top-24">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-between">
                                Resumen del Pedido
                                <span className="bg-blue-100 text-blue-700 text-xs py-1 px-2.5 rounded-full ring-1 ring-blue-600/20">
                                    {cart?.items.length || 0} {(cart?.items.length || 0) === 1 ? 'ítem' : 'ítems'}
                                </span>
                            </h2>

                            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {cart?.items.length === 0 ? (
                                    <p className="text-sm font-medium text-gray-500 text-center py-4">Tu carrito está vacío</p>
                                ) : (
                                    cart?.items.map((item) => (
                                        <div key={item.product.id} className="flex gap-4 group">
                                            <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 flex-shrink-0 relative">
                                                {/* Representing the real cover image format if we assume product image logic exist */}
                                                <div className="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-50 flex items-center justify-center rounded-xl overflow-hidden">
                                                    {item.product.images?.length > 0 ? (
                                                        <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-gray-400 text-xs font-bold">IMG</span>
                                                    )}
                                                </div>
                                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                                    {item.product.title}
                                                </p>
                                                <p className="text-sm font-bold text-gray-500 mt-1">
                                                    ${item.product.price.toLocaleString("es-AR")}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Subtotal</span>
                                    <span className="font-bold text-gray-900">${subtotal.toLocaleString("es-AR")}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Costo de Envío</span>
                                    <span className={clsx("font-bold", shippingCost === 0 ? "text-emerald-600" : "text-gray-900")}>
                                        {shippingCost === 0 ? "Gratis" : `$${shippingCost.toLocaleString("es-AR")}`}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-base font-bold text-gray-900">Total a Pagar</span>
                                    <span className="text-2xl font-extrabold text-blue-600">${total.toLocaleString("es-AR")}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 font-medium text-right uppercase tracking-wider">
                                    Impuestos incluidos
                                </p>
                            </div>

                            <div className="mt-8 bg-emerald-50 rounded-2xl p-4 flex gap-3 ring-1 ring-emerald-500/20">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-emerald-900">Garantía de Satisfacción</p>
                                    <p className="text-xs font-medium text-emerald-700/80 mt-0.5">Devolución gratis hasta 30 días después de tu compra.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
