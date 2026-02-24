import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { User, Settings, Package, LogOut, ClipboardList } from "lucide-react";

export default function UserButton() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 shadow-sm bg-white hover:ring-2 hover:ring-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all z-50 relative"
                aria-label="Abrir menú de usuario"
                aria-expanded={isOpen}
            >
                <img
                    src={user?.photoImage || "/default-avatar.png"}
                    alt={user?.username || "Usuario"}
                    className="w-full h-full rounded-full object-cover"
                />
            </button>

            {/* Menú flotante estilo Clerk */}
            <div
                className={`absolute right-0 mt-2 w-[300px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 z-40 transition-all duration-200 origin-top-right overflow-hidden
                ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
            >
                {/* Cabecera / Info del usuario */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                    <img
                        src={user?.photoImage || "/default-avatar.png"}
                        alt={user?.username || "Usuario"}
                        className="w-11 h-11 rounded-full object-cover border border-gray-200"
                    />
                    <div className="flex flex-col justify-center overflow-hidden">
                        <span className="font-semibold text-gray-900 text-sm truncate w-full">
                            {user?.firstName && user?.lastName
                                ? `${user.firstName} ${user.lastName}`
                                : user?.username || "Usuario"}
                        </span>
                        <span className="text-xs text-gray-500 truncate w-full">
                            {user?.email || "correo@ejemplo.com"}
                        </span>
                    </div>
                </div>

                {/* Opciones principales */}
                <div className="p-2">
                    <ul className="flex flex-col text-gray-700 w-full space-y-0.5">
                        <li>
                            <a
                                href="/account"
                                className="group flex gap-3 items-center px-3 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium text-gray-700"
                            >
                                <User className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                                Gestionar cuenta
                            </a>
                        </li>
                        <li>
                            <a
                                href="/orders"
                                className="group flex gap-3 items-center px-3 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium text-gray-700"
                            >
                                <ClipboardList className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                                Mis pedidos
                            </a>
                        </li>
                        <li>
                            <a
                                href="/dashboard/my-products"
                                className="group flex gap-3 items-center px-3 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium text-gray-700"
                            >
                                <Package className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                                Mis productos
                            </a>
                        </li>
                        <li>
                            <a
                                href="/settings"
                                className="group flex gap-3 items-center px-3 py-2.5 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium text-gray-700"
                            >
                                <Settings className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                                Configuración
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Footer del menú */}
                <div className="p-2 border-t border-gray-100">
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            if (logout) logout();
                        }}
                        className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-200"
                    >
                        <LogOut className="w-4 h-4 text-gray-500 group-hover:text-rose-500 transition-colors" />
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}
