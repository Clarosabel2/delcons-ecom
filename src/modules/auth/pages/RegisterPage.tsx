import React, { useState } from "react";
import { Link } from "react-router";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import clsx from "clsx";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            setError("Por favor completa todos los campos.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);

        // Simulación de llamada API para registro
        setTimeout(() => {
            setLoading(false);
            alert(`Registrado con éxito: ${firstName} ${lastName} (${email})`);
            // Aquí redirigir o manejar el login automático
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
            {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-600 px-3 py-2 rounded-xl text-xs font-medium animate-fade-in flex items-center gap-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 space-y-1">
                    <label className="text-xs font-bold text-gray-700 ml-1">Nombre</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                            <User className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Tu nombre"
                            className="w-full pl-9 pr-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400"
                            required
                        />
                    </div>
                </div>

                <div className="flex-1 space-y-1">
                    <label className="text-xs font-bold text-gray-700 ml-1">Apellido</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                            <User className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Tu apellido"
                            className="w-full pl-9 pr-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 ml-1">Correo Electrónico</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        <Mail className="w-4 h-4" />
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        className="w-full pl-9 pr-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400"
                        required
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 ml-1">Contraseña</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        <Lock className="w-4 h-4" />
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400 tracking-wider"
                        required
                        minLength={6}
                    />
                </div>
            </div>

            <div className="space-y-1 mb-1">
                <label className="text-xs font-bold text-gray-700 ml-1">Confirmar Contraseña</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        <Lock className="w-4 h-4" />
                    </div>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={clsx(
                            "w-full pl-9 pr-3 py-2 bg-gray-50/50 border rounded-xl focus:bg-white focus:outline-none focus:ring-4 transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400 tracking-wider",
                            confirmPassword && password !== confirmPassword
                                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/10"
                                : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"
                        )}
                        required
                        minLength={6}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-extrabold rounded-xl text-white bg-gray-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-[0.98]"
            >
                {loading ? "Creando cuenta..." : "Crear cuenta"}
                {!loading && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            </button>

            <div className="relative mt-3 mb-1">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-[10px]">
                    <span className="px-3 bg-white text-gray-500 font-bold">O</span>
                </div>
            </div>

            <p className="text-center text-gray-500 text-xs font-semibold">
                ¿Ya tienes una cuenta?{" "}
                <Link
                    to="/auth"
                    className="text-blue-600 hover:text-blue-800 font-bold hover:underline transition-colors"
                >
                    Inicia sesión aquí
                </Link>
            </p>
        </form>
    );
}
