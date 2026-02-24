import React, { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Shield,
    Key,
    Save,
    Camera
} from "lucide-react";
import clsx from "clsx";

export default function AccountPage() {
    const { user } = useAuth();

    // Some visual mock state for a form (since we might not have full edit API yet)
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header Section */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                    {/* Avatar Group */}
                    <div className="relative group shrink-0">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 flex items-center justify-center text-4xl text-white font-bold ring-4 ring-white">
                            {user?.firstName ? user.firstName[0].toUpperCase() : <User className="w-12 h-12" />}
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 sm:p-3 bg-white text-gray-700 rounded-full shadow-lg border border-gray-100 hover:text-blue-600 hover:scale-110 transition-all">
                            <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 text-center sm:text-left z-10 w-full">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                            {user ? `${user.firstName} ${user.lastName}` : "Mi Cuenta"}
                        </h1>
                        <p className="text-gray-500 font-medium flex items-center justify-center sm:justify-start gap-2 mt-2">
                            <Mail className="w-4 h-4" />
                            {user?.email || "usuario@ejemplo.com"}
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 ring-1 ring-green-600/20">
                                Cuenta Activa
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 ring-1 ring-blue-600/20">
                                Miembro desde 2024
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column: Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/40 border border-gray-100">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-600" />
                                    Información Personal
                                </h2>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    {isEditing ? "Cancelar" : "Editar"}
                                </button>
                            </div>

                            <form className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                                            Nombre Completo
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <User className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                disabled={!isEditing}
                                                defaultValue={user ? `${user.firstName} ${user.lastName}` : ""}
                                                className={clsx(
                                                    "w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-medium transition-all",
                                                    isEditing
                                                        ? "bg-white border-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-gray-900"
                                                        : "bg-gray-50/50 border-transparent text-gray-600 cursor-not-allowed"
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                                            Correo Electrónico
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                disabled
                                                defaultValue={user?.email || ""}
                                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50/50 border-transparent text-gray-500 text-sm font-medium cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                                            Teléfono
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="tel"
                                                disabled={!isEditing}
                                                placeholder="+1 234 567 890"
                                                className={clsx(
                                                    "w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-medium transition-all",
                                                    isEditing
                                                        ? "bg-white border-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-gray-900"
                                                        : "bg-gray-50/50 border-transparent text-gray-600 cursor-not-allowed"
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                                            Ubicación
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                disabled={!isEditing}
                                                placeholder="Ciudad, País"
                                                className={clsx(
                                                    "w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-medium transition-all",
                                                    isEditing
                                                        ? "bg-white border-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-gray-900"
                                                        : "bg-gray-50/50 border-transparent text-gray-600 cursor-not-allowed"
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="pt-4 flex justify-end animate-fade-in-modal">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            Guardar Cambios
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Security & Actions */}
                    <div className="space-y-6">
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/40 border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                                <Shield className="w-5 h-5 text-indigo-600" />
                                Seguridad
                            </h2>
                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-500/10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-white transition-colors">
                                            <Key className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-gray-900">Cambiar Contraseña</p>
                                            <p className="text-xs font-medium text-gray-500 mt-0.5">Última vez hace 2 meses</p>
                                        </div>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/20 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <h3 className="text-lg font-bold mb-2 relative z-10">¿Necesitas ayuda?</h3>
                            <p className="text-blue-100 text-sm font-medium mb-6 relative z-10">
                                Nuestro equipo de soporte está disponible 24/7 para ayudarte con tu cuenta.
                            </p>
                            <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-sm font-bold transition-colors border border-white/20 relative z-10 text-white cursor-pointer focus:outline-none focus:ring-4 focus:ring-white/20">
                                Contactar Soporte
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
