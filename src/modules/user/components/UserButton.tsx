import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { VscAccount } from "react-icons/vsc";
import { CiLogout, CiSettings, CiViewList } from "react-icons/ci";
import { TfiPackage } from "react-icons/tfi";

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
                className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-gray-200 shadow-md bg-white hover:shadow-lg transition-all focus:outline-none focus:ring-1 focus:ring-[#1b6d87]"
                aria-label="Abrir menú de usuario"
            >
                <img
                    src={user?.photoImage || "/default-avatar.png"}
                    alt={user?.username}
                    className="w-9 h-9 rounded-full object-cover border border-gray-300"
                />
            </button>

            {/* Menú flotante */}
            <div
                className={`absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 transition-all duration-200 origin-top-right
                ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
                style={{ minWidth: '15rem' }}
            >
                <div className="flex flex-col items-center py-5 border-b border-gray-100">
                    <img
                        src={user?.photoImage || "/default-avatar.png"}
                        alt={user?.username}
                        className="w-14 h-14 rounded-full object-cover border-2 border-primary-500 shadow"
                    />
                    <span className="mt-2 font-semibold text-gray-800 text-base">
                        {user?.firstName || user?.username}
                    </span>
                    <span className="text-xs text-gray-400">{user?.email}</span>
                </div>
                <ul className="py-2 text-gray-700 w-full">
                    <li>
                        <a
                            href="/account"
                            className="flex gap-3 items-center px-5 py-3 hover:bg-gray-50 transition-colors text-base font-medium"
                        >
                            <VscAccount className="text-xl text-primary-500" />
                            Mi cuenta
                        </a>
                    </li>
                    <li>
                        <a
                            href="/settings"
                            className="flex gap-3 items-center px-5 py-3 hover:bg-gray-50 transition-colors text-base font-medium"
                        >
                            <CiSettings className="text-xl text-primary-500" />
                            Configuración
                        </a>
                    </li>
                    <li>
                        <a
                            href="/orders"
                            className="flex gap-3 items-center px-5 py-3 hover:bg-gray-50 transition-colors text-base font-medium"
                        >
                            <CiViewList className="text-xl text-primary-500" />
                            Mis pedidos
                        </a>
                    </li>
                    <li>
                        <a
                            href="dashboard/my-products"
                            className="flex gap-3 items-center px-5 py-3 hover:bg-gray-50 transition-colors text-base font-medium"
                        >
                            <TfiPackage className="text-xl text-primary-500" />
                            Mis productos
                        </a>
                    </li>
                </ul>
                <div className="border-t border-gray-100">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-5 py-3 text-base font-semibold text-red-600 hover:bg-red-50 transition-colors focus:outline-none"
                    >
                        <CiLogout className="text-xl" /> Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}
