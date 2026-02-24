import React from "react";
import Header from "../../components/Header";
import { useLocation } from "react-router";
import { Outlet } from "react-router";

export default function DashboardLayout() {
    const location = useLocation();
    let titulo = "";
    let subtitulo = "";
    if (location.pathname.includes("my-products")) {
        titulo = "Mis productos";
        subtitulo = "Gestión de productos de tu tienda";
    } else if (location.pathname.includes("my-orders")) {
        titulo = "Mis pedidos";
        subtitulo = "Gestión de tus pedidos";
    } else {
        titulo = "Dashboard";
        subtitulo = "Panel principal";
    }

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Header */}
            <Header />
            <div className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100 sticky top-16 z-20">
                <div className="px-6 py-5 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                                {titulo}
                            </h1>
                            <p className="text-sm font-medium text-gray-500 mt-1">
                                {subtitulo}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-6 py-8 max-w-7xl mx-auto">
                <Outlet />
            </div>
        </div>
    );
}
