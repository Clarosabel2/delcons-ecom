import React, { useEffect, useState } from "react";

import CartDesktop from "../../cart/components/CartDesktop";
import Logo from "./Logo";
import { useAuth } from "../../auth/hooks/useAuth";
import LinkAnimated from "./LinkAnimated";
import UserButton from "../../user/components/UserButton";
import { useLocation, useNavigate } from "react-router";

export default function Header() {
    const { isLogin } = useAuth();
    const location = useLocation();
    const [showCart, setShowCart] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const shouldShow = !location.pathname.startsWith("/dashboard");
        setShowCart(shouldShow);
    }, [location.pathname]);

    return (
        <header className="pb-20">
            <div className="fixed z-30 flex items-center justify-between w-full p-4 mb-5 bg-white shadow-xl lg:z-50">
                <nav className="flex items-center justify-between w-full px-4">
                    <div
                        className="rounded px-[2rem] hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <Logo></Logo>
                    </div>
                    <nav>
                        <ul className="flex items-center justify-center gap-2">
                            {showCart && (
                                <li className="hidden lg:block">
                                    <CartDesktop />
                                </li>
                            )}
                            <li>
                                {!isLogin ? (
                                    <LinkAnimated href="/auth">
                                        Sign In
                                    </LinkAnimated>
                                ) : (
                                    <UserButton />
                                )}
                            </li>
                        </ul>
                    </nav>
                </nav>
            </div>
        </header>
    );
}
