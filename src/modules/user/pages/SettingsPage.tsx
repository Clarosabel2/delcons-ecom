import React, { useState } from "react";
import {
    Settings,
    Moon,
    Sun,
    Monitor,
    Globe,
    Bell,
    Smartphone,
    Mail,
    Shield,
    Eye,
    Save
} from "lucide-react";
import clsx from "clsx";

export default function SettingsPage() {
    // Mock states for settings
    const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
    const [language, setLanguage] = useState("es");
    const [emailNotif, setEmailNotif] = useState(true);
    const [pushNotif, setPushNotif] = useState(false);
    const [publicProfile, setPublicProfile] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header Page */}
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                        <Settings className="w-8 h-8 text-blue-600" />
                        Configuraciones
                    </h1>
                    <p className="text-sm font-medium text-gray-500 mt-2">
                        Administra tus preferencias de visualización, idioma, notificaciones y privacidad.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Panel de Opciones */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. Apariencia */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/40 border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                                <Sun className="w-5 h-5 text-amber-500" />
                                Apariencia
                            </h2>
                            <p className="text-sm text-gray-500 font-medium mb-4">
                                Elige cómo quieres que se vea la interfaz.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { id: "light", icon: <Sun className="w-5 h-5" />, label: "Claro" },
                                    { id: "dark", icon: <Moon className="w-5 h-5" />, label: "Oscuro" },
                                    { id: "system", icon: <Monitor className="w-5 h-5" />, label: "Sistema" },
                                ].map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setTheme(t.id as any)}
                                        className={clsx(
                                            "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2",
                                            theme === t.id
                                                ? "border-blue-600 bg-blue-50/50 text-blue-700"
                                                : "border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:bg-gray-50"
                                        )}
                                    >
                                        {t.icon}
                                        <span className="text-sm font-bold">{t.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. Idioma & Región */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/40 border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                                <Globe className="w-5 h-5 text-blue-600" />
                                Idioma y Región
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                                        Idioma Principal
                                    </label>
                                    <select
                                        value={language}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900 cursor-pointer"
                                    >
                                        <option value="es">Español (América Latina)</option>
                                        <option value="en">English (United States)</option>
                                        <option value="pt">Português (Brasil)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* 3. Notificaciones */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/40 border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                                <Bell className="w-5 h-5 text-rose-500" />
                                Notificaciones
                            </h2>
                            <div className="space-y-4">
                                <label className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Correos Electrónicos</p>
                                            <p className="text-xs font-medium text-gray-500 mt-0.5">Promociones, actualizaciones y resúmenes</p>
                                        </div>
                                    </div>
                                    <div className="relative inline-block w-12 h-6 rounded-full transition-colors ease-in-out duration-200">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={emailNotif}
                                            onChange={(e) => setEmailNotif(e.target.checked)}
                                        />
                                        <div className={clsx(
                                            "w-11 h-6 rounded-full transition-colors",
                                            emailNotif ? "bg-blue-600" : "bg-gray-200"
                                        )}></div>
                                        <div className={clsx(
                                            "absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform shadow-sm",
                                            emailNotif ? "translate-x-5" : "translate-x-0"
                                        )}></div>
                                    </div>
                                </label>

                                <label className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                                            <Smartphone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">Notificaciones Push</p>
                                            <p className="text-xs font-medium text-gray-500 mt-0.5">Mensajes urgentes y estado de pedidos</p>
                                        </div>
                                    </div>
                                    <div className="relative inline-block w-12 h-6 rounded-full transition-colors ease-in-out duration-200">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={pushNotif}
                                            onChange={(e) => setPushNotif(e.target.checked)}
                                        />
                                        <div className={clsx(
                                            "w-11 h-6 rounded-full transition-colors",
                                            pushNotif ? "bg-blue-600" : "bg-gray-200"
                                        )}></div>
                                        <div className={clsx(
                                            "absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform shadow-sm",
                                            pushNotif ? "translate-x-5" : "translate-x-0"
                                        )}></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Privacy & Save */}
                    <div className="space-y-6">
                        {/* Privacy */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-200/40 border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                                <Shield className="w-5 h-5 text-emerald-600" />
                                Privacidad
                            </h2>

                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center mt-0.5">
                                    <input
                                        type="checkbox"
                                        checked={publicProfile}
                                        onChange={(e) => setPublicProfile(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500/20 focus:ring-offset-0 transition-all cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 flex items-center gap-2 group-hover:text-blue-700 transition-colors">
                                        <Eye className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                                        Perfil Público
                                    </p>
                                    <p className="text-xs font-medium text-gray-500 mt-1">
                                        Permite que otros usuarios y profesionales vean tu perfil e información básica.
                                    </p>
                                </div>
                            </label>
                        </div>

                        {/* Save Action */}
                        <div className="bg-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-900/20 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                            <h3 className="text-lg font-bold mb-2 relative z-10">Guardar Cambios</h3>
                            <p className="text-slate-300 text-sm font-medium mb-6 relative z-10">
                                Asegúrate de guardar todas tus nuevas configuraciones antes de salir.
                            </p>
                            <button className="w-full flex justify-center items-center py-3 px-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-extrabold transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 relative z-10 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/30 text-white">
                                <Save className="w-4 h-4 mr-2" />
                                Actualizar Ajustes
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
