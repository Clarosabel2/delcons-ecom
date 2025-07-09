import React from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

interface LogoutModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl w-80 text-center transform transition-all duration-300 opacity-0 scale-95 animate-fade-in-modal">
                <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 focus:outline-none text-xl" aria-label="Cerrar">
                    <FiX />
                </button>
                <div className="flex justify-center mb-3">
                    <FiAlertTriangle className="text-yellow-500 text-4xl" />
                </div>
                <h2 className="text-xl font-extrabold mb-2 text-gray-800">¿Cerrar sesión?</h2>
                <p className="mb-7 text-base text-gray-500">¿Estás seguro de que querés cerrar sesión?</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center gap-2"
                    >
                        <FiAlertTriangle className="text-lg" />
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;