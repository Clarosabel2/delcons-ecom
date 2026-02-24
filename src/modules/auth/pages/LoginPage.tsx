import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router";
import { OrbitProgress } from "react-loading-indicators";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuth();

    // @ts-ignore - Assuming LoginRequest exists in the service
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const credentials = {
            username,
            password,
        };

        try {
            setLoading(true);
            setError(null);
            await login(credentials);
            navigate("/");
        } catch (error: any) {
            setError("Credenciales inválidas");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">

            {/* Sección ingresar con Google */}
            <div className="flex flex-col gap-2">
                <button
                    type="button"
                    onClick={() => alert('Login con Google (próximamente)')}
                    className="group relative w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 hover:border-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 shadow-sm hover:shadow-md text-sm"
                >
                    <FcGoogle className="text-2xl transition-transform group-hover:scale-110" />
                    Ingresar con Google
                </button>
            </div>

            <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink-0 mx-3 text-gray-400 text-xs font-semibold">o ingresa con tu email</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-600 px-3 py-2 rounded-xl text-xs font-medium animate-fade-in flex items-center gap-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}

            <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 ml-1">Email / Usuario</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        <Mail className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="ejemplo@correo.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400"
                        required
                    />
                </div>
            </div>

            <div className="space-y-1 mb-1">
                <div className="flex items-center justify-between ml-1 pr-1">
                    <label className="text-xs font-bold text-gray-700">Contraseña</label>
                    <a href="#" className="text-[10px] font-bold text-blue-600 hover:text-blue-800 transition-colors">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        <Lock className="w-4 h-4" />
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium text-gray-900 placeholder:text-gray-400 tracking-wider"
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-extrabold rounded-xl text-white bg-gray-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-[0.98]"
            >
                {loading ? (
                    <div className="flex items-center justify-center w-4 h-4">
                        <OrbitProgress color="#fff" size="small" />
                    </div>
                ) : (
                    <>
                        Ingresar
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                )}
            </button>

            <p className="text-center text-gray-500 text-xs font-semibold mt-1">
                ¿No tienes cuenta?{" "}
                <Link
                    to="/auth/register"
                    className="text-blue-600 hover:text-blue-800 font-bold hover:underline transition-colors"
                >
                    Regístrate aquí
                </Link>
            </p>
        </form>
    );
}
