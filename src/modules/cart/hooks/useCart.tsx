import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";


export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
