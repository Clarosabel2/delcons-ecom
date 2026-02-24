import React from "react";
import {
    Package,
    Truck,
    CheckCircle2,
    Clock,
    ChevronRight,
    MapPin,
    Calendar,
    Search,
    Filter
} from "lucide-react";
import clsx from "clsx";

// Mock Data
const MOCK_ORDERS = [
    {
        id: "ORD-9823-A4B1",
        date: "24 Feb, 2026",
        status: "delivered",
        total: 1250000,
        items: 3,
        address: "Av. Corrientes 3245, CABA",
        trackingLink: "#",
        products: [
            { name: "Cemento Portland Tipo 1", qty: 10, price: 55000, image: "https://via.placeholder.com/60" },
            { name: "Hierro Corrugado 1/2\"", qty: 20, price: 15000, image: "https://via.placeholder.com/60" },
            { name: "Ladrillos Huecos (Pallet)", qty: 1, price: 400000, image: "https://via.placeholder.com/60" }
        ]
    },
    {
        id: "ORD-8812-C9X2",
        date: "20 Feb, 2026",
        status: "processing",
        total: 845000,
        items: 2,
        address: "Av. Corrientes 3245, CABA",
        trackingLink: "#",
        products: [
            { name: "Pintura Látex Interior 20L", qty: 2, price: 350000, image: "https://via.placeholder.com/60" },
            { name: "Rodillo Antigota 22cm", qty: 3, price: 48333.33, image: "https://via.placeholder.com/60" }
        ]
    }
];

const getStatusConfig = (status: string) => {
    switch (status) {
        case "delivered":
            return {
                label: "Entregado",
                icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
                bgClass: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
                barColor: "bg-emerald-500",
                progress: "100%"
            };
        case "processing":
            return {
                label: "En Preparación",
                icon: <Clock className="w-5 h-5 text-amber-500" />,
                bgClass: "bg-amber-50 text-amber-700 ring-amber-600/20",
                barColor: "bg-amber-500",
                progress: "40%"
            };
        case "shipped":
            return {
                label: "En Camino",
                icon: <Truck className="w-5 h-5 text-blue-500" />,
                bgClass: "bg-blue-50 text-blue-700 ring-blue-600/20",
                barColor: "bg-blue-500",
                progress: "75%"
            };
        default:
            return {
                label: "Pendiente",
                icon: <Package className="w-5 h-5 text-gray-500" />,
                bgClass: "bg-gray-100 text-gray-700 ring-gray-500/20",
                barColor: "bg-gray-400",
                progress: "10%"
            };
    }
};

export default function OrdersPage() {
    return (
        <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header Page */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <Package className="w-8 h-8 text-blue-600" />
                            Mis Pedidos
                        </h1>
                        <p className="text-sm font-medium text-gray-500 mt-2">
                            Revisa el estado y el historial completo de tus compras.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar pedido..."
                                className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm font-medium bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all w-full sm:w-64 shadow-sm"
                            />
                        </div>
                        <button className="p-2 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 text-gray-600 transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-6">
                    {MOCK_ORDERS.map((order) => {
                        const config = getStatusConfig(order.status);

                        return (
                            <div key={order.id} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden relative group transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/5">

                                {/* Header Order */}
                                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 border-b border-gray-100 pb-6 mb-6 relative z-10">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-lg font-bold text-gray-900">
                                                Pedido <span className="text-blue-600">{order.id}</span>
                                            </h2>
                                            <span className={clsx(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ring-1",
                                                config.bgClass
                                            )}>
                                                {config.icon}
                                                {config.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm font-medium text-gray-500 pt-1">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" />
                                                {order.date}
                                            </span>
                                            <span className="hidden sm:inline text-gray-300">•</span>
                                            <span className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4" />
                                                <span className="truncate max-w-[200px] sm:max-w-xs">{order.address}</span>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto">
                                        <div className="text-left lg:text-right">
                                            <p className="text-sm font-medium text-gray-500">Total ({order.items} items)</p>
                                            <p className="text-xl font-extrabold text-gray-900">${order.total.toLocaleString("es-AR")}</p>
                                        </div>
                                        <button className="hidden sm:flex items-center justify-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-bold rounded-xl transition-colors hover:scale-105">
                                            Ver Detalle
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>
                                </div>

                                {/* Body / Products */}
                                <div className="flex flex-col md:flex-row gap-8 relative z-10 w-full">
                                    <div className="flex-1 space-y-4">
                                        <h3 className="text-sm font-bold text-gray-900">Artículos</h3>
                                        <div className="space-y-3">
                                            {order.products.map((product, idx) => (
                                                <div key={idx} className="flex items-center gap-4 group/item">
                                                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
                                                        <div className="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-100 animate-pulse">
                                                            {/* Placeholder image representation, in real app put <img src={product.image} /> */}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-gray-900 truncate group-hover/item:text-blue-600 transition-colors">
                                                            {product.name}
                                                        </p>
                                                        <p className="text-xs font-medium text-gray-500">
                                                            Cant: {product.qty} x ${product.price.toLocaleString("es-AR")}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tracking Progress */}
                                    <div className="w-full md:w-64 lg:w-80 shrink-0 bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col justify-center">
                                        <h3 className="text-sm font-bold text-gray-900 mb-4">Estado del Envío</h3>

                                        <div className="relative pt-2">
                                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200">
                                                <div style={{ width: config.progress }} className={clsx(
                                                    "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-1000",
                                                    config.barColor
                                                )}></div>
                                            </div>
                                            <div className="flex justify-between text-xs font-medium text-gray-500">
                                                <span>Recibido</span>
                                                <span>En Camino</span>
                                                <span>Entregado</span>
                                            </div>
                                        </div>

                                        <button className="mt-6 w-full py-2.5 px-4 bg-white border border-gray-200 hover:border-blue-200 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group/track focus:outline-none focus:ring-4 focus:ring-blue-500/10">
                                            <Truck className="w-4 h-4 text-gray-400 group-hover/track:text-blue-600 transition-colors truncate" />
                                            Seguir Envío
                                        </button>
                                    </div>
                                </div>

                                {/* Decorative Light gradient hidden until hover */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/0 via-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
