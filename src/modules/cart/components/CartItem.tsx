import React from 'react'
import { Item } from '../models/Cart';
import { FaTrash } from 'react-icons/fa';
import QuantitySelector from '../../shared/components/QuantitySelector';
import { useCart } from '../hooks/useCart';

interface CartItemProps {
    item: Item;
}

export default function CartItem({ item }: CartItemProps) {
    const { removeItem, updateItemQuantity } = useCart();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="group flex gap-3 p-3 mb-2 bg-white border border-gray-100 rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-300 relative">

            {/* Botón Eliminar */}
            <button
                onClick={() => removeItem(item.product.id)}
                className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors z-10"
                title="Eliminar producto"
            >
                <FaTrash className="w-3 h-3" />
            </button>

            {/* Imagen del Producto */}
            <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center p-1.5">
                <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="object-contain w-full h-full mix-blend-multiply transition-transform group-hover:scale-105"
                />
            </div>

            {/* Detalles y Acciones */}
            <div className="flex flex-col flex-1 justify-between min-w-0 pr-7 py-0.5">

                {/* Título y Precio Unitario */}
                <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-tight mb-1 pr-1">
                        {item.product.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium mb-2">
                        {formatCurrency(item.product.price)} c/u
                    </p>
                </div>

                {/* Cantidad y Subtotal */}
                <div className="flex flex-wrap items-end justify-between gap-2 mt-auto">
                    <div className="scale-90 origin-bottom-left -ml-1">
                        <QuantitySelector
                            value={item.quantity}
                            onChange={(newQuantity) => updateItemQuantity(item.product.id, newQuantity)}
                        />
                    </div>

                    <div className="text-right">
                        <span className="text-sm font-black text-blue-600 block leading-none">
                            {formatCurrency(item.subtotal)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
