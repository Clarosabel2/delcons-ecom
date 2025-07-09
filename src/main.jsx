import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.js";
import CartProvider from "./modules/cart/contexts/CartContext.tsx";
import { AuthProvider } from './modules/auth/context/AuthContext';

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </AuthProvider>
    </StrictMode>
);
