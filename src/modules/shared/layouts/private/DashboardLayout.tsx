import React from "react";
import {
    FiSearch,
    FiPlus,
    FiFilter,
    FiEdit,
    FiTrash2,
    FiEye,
    FiMoreVertical,
} from "react-icons/fi";
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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {titulo}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {subtitulo}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-6 py-6">
                <Outlet />
            </div>
        </div>
    );
}
