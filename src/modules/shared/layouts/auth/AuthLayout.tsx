import React from "react";
import { Outlet } from "react-router";
import Header from "../../components/Header";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-tr from-[#e0f2fe] via-white to-[#b6e0f7]">
            {/* Imagen/ilustración */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-10 order-1 md:order-none">
                <img
                    src="/logo_large.png"
                    alt="Auth Illustration"
                    className="max-w-xs md:max-w-full max-h-80 md:max-h-full object-contain drop-shadow-xl"
                    style={{ filter: "brightness(0.95) drop-shadow(4px 5px 2px rgba(0, 0, 0, 0.18))" }}
                />
            </div>

            {/* Formulario */}
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-4 md:px-8 py-8 md:py-12 min-h-[60vh]">
                <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 px-8 py-10 animate-fade-in-modal">
                    <div className="flex flex-col items-center mb-8">
                        <img src="/logo-delcons.png" alt="Logo" className="w-16 h-16 mb-2" />
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">Bienvenido de nuevo</h2>
                        <p className="text-gray-500 text-base text-center">Ingresa a tu cuenta para continuar.</p>
                    </div>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
