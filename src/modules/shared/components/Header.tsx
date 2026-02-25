import React, { useEffect, useState } from "react";
import CartDesktop from "../../cart/components/CartDesktop";
import Logo from "./Logo";
import { useAuth } from "../../auth/hooks/useAuth";
import LinkAnimated from "./LinkAnimated";
import UserButton from "../../user/components/UserButton";
import UserButtonPhone from "../../user/components/UserButtonPhone";
import { useLocation, useNavigate, useParams } from "react-router";
import clsx from "clsx";
import ConfirmModal from "./ConfirmModal";
import { useCart } from "../../cart/hooks/useCart";

export default function Header() {
    const { isLogin } = useAuth();
    const location = useLocation();
    const [showCart, setShowCart] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const navigate = useNavigate();
    const { storeId } = useParams();
    const { hasItems, clearCart } = useCart();

    useEffect(() => {
        const isRoot = location.pathname === "/";
        const isAuth = location.pathname.startsWith("/auth");
        const isStorePage = /^\/[^/]+$/.test(location.pathname);
        const shouldShow = !location.pathname.startsWith("/dashboard") && !isAuth && !isRoot && !isStorePage;
        setShowCart(shouldShow);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogoClick = () => {
        // If we are already on root, do nothing or just navigate
        if (location.pathname === "/") return;

        // If we have items in the cart, warn the user they will lose them
        if (hasItems) {
            setShowConfirmModal(true);
        } else {
            navigate("/");
        }
    };

    const handleConfirmLeave = () => {
        clearCart();
        setShowConfirmModal(false);
        navigate("/");
    };

    return (
        <header className="relative z-50 h-[88px]">
            {/* Header Fijo */}
            <div
                className={clsx(
                    "fixed top-0 left-0 right-0 w-full transition-all duration-300",
                    scrolled
                        ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-blue-900/5 border-b border-white/20 py-3"
                        : "bg-transparent py-5"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between">
                        {/* Logo Area */}
                        <div
                            className={clsx(
                                "flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95",
                                scrolled ? "scale-90 hover:scale-95" : ""
                            )}
                            onClick={handleLogoClick}
                        >
                            <Logo />
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4 sm:gap-6">
                            {showCart && (
                                <div className="hidden lg:block relative z-50 group">
                                    <CartDesktop />
                                </div>
                            )}

                            <div className="flex items-center pl-2 sm:pl-4 border-l border-gray-200">
                                {!isLogin ? (
                                    <div className="hover:-translate-y-0.5 transition-transform">
                                        <LinkAnimated href="/auth">
                                            Sign In
                                        </LinkAnimated>
                                    </div>
                                ) : (
                                    <>
                                        <div className="hidden md:block">
                                            <UserButton />
                                        </div>
                                        <UserButtonPhone />
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            <ConfirmModal
                isOpen={showConfirmModal}
                title="¿Estás seguro de salir?"
                message="Tienes productos en el carrito de este corralón. Si vuelves al inicio a buscar otros corralones, tu carrito actual se vaciará."
                confirmText="Sí, vaciar carrito y salir"
                cancelText="Mantenerme aquí"
                onConfirm={handleConfirmLeave}
                onCancel={() => setShowConfirmModal(false)}
            />
        </header>
    );
}