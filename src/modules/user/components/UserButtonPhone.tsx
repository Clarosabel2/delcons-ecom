import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { User, Settings, Package, LogOut, ClipboardList, X } from "lucide-react";
import clsx from "clsx";
import { useNavigate } from "react-router";

export default function UserButtonPhone() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleNavigation = (path: string) => {
        setIsOpen(false);
        navigate(path);
    };

    return (
        <div className="md:hidden">
            {/* Botón (Avatar) */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 shadow-sm bg-white hover:ring-2 hover:ring-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all relative"
                aria-label="Abrir menú de usuario móvil"
            >
                <img
                    src={user?.photoImage || "/default-avatar.png"}
                    alt={user?.username || "Usuario"}
                    className="w-full h-full rounded-full object-cover"
                />
            </button>

            {/* Backdrop y Modal */}
            {mounted && createPortal(
                <div className="md:hidden">
                    {/* Backdrop */}
                    <div
                        className={clsx(
                            "fixed inset-0 z-[60] bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300",
                            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                        )}
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Bottom Sheet Modal */}
                    <div
                        className={clsx(
                            "fixed bottom-0 left-0 right-0 w-full bg-white z-[70] rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col",
                            isOpen ? "translate-y-0" : "translate-y-full"
                        )}
                    >
                        {/* Drag Indicator & Header */}
                        <div className="relative pt-3 pb-4 border-b border-gray-100 rounded-t-3xl bg-white">
                            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 rounded-full" />

                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label="Cerrar"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center gap-3 mt-6 px-4">
                                <img
                                    src={user?.photoImage || "/default-avatar.png"}
                                    alt={user?.username || "Usuario"}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                <div className="text-center">
                                    <h3 className="font-bold text-gray-900 text-lg">
                                        {user?.firstName && user?.lastName
                                            ? `${user.firstName} ${user.lastName}`
                                            : user?.username || "Usuario"}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {user?.email || "correo@ejemplo.com"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Área */}
                        <div className="flex flex-col px-4 py-3 overflow-y-auto max-h-[60vh] custom-scrollbar">
                            <ul className="flex flex-col space-y-1">
                                <li>
                                    <button
                                        onClick={() => handleNavigation("/account")}
                                        className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-blue-50 active:bg-blue-100 transition-colors text-left"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-500">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-gray-700 text-base">Gestionar cuenta</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavigation("/orders")}
                                        className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-blue-50 active:bg-blue-100 transition-colors text-left"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-500">
                                            <ClipboardList className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-gray-700 text-base">Mis pedidos</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavigation("/dashboard/my-products")}
                                        className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-blue-50 active:bg-blue-100 transition-colors text-left"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-500">
                                            <Package className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-gray-700 text-base">Mis productos</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleNavigation("/settings")}
                                        className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-blue-50 active:bg-blue-100 transition-colors text-left"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-500">
                                            <Settings className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-gray-700 text-base">Configuración</span>
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Footer / Logout */}
                        <div className="p-4 bg-white border-t border-gray-100 shrink-0 pb-6 sm:pb-4">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    if (logout) logout();
                                }}
                                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-base font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 active:scale-[0.98] transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Cerrar sesión</span>
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
