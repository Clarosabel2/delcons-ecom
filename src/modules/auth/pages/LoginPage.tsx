import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { OrbitProgress } from "react-loading-indicators";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuth();
    

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: LoginRequest = {
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
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Iniciar sesión
            </h2>

            {/* Sección ingresar con Google */}
            <div className="mb-6">
                <p className="text-center text-gray-500 mb-3 font-medium">Ingresar con</p>
                <button
                    type="button"
                    onClick={() => alert('Login con Google (próximamente)')}
                    className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md py-2 bg-white hover:bg-gray-50 transition shadow-sm font-semibold text-gray-700"
                >
                    <FcGoogle className="text-2xl" />
                    Google
                </button>
            </div>

            <div className="flex items-center gap-2 mb-6">
                <hr className="flex-1 border-gray-300" />
                <span className="text-gray-400 text-sm font-medium">o</span>
                <hr className="flex-1 border-gray-300" />
            </div>

            {error && (
                <div className="mb-4 text-red-600 font-semibold bg-red-100 p-3 rounded">
                    {error}
                </div>
            )}

            <label className="block mb-4">
                <span className="text-gray-700 font-semibold">
                    Email or username
                </span>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                />
            </label>

            <label className="block mb-6">
                <span className="text-gray-700 font-semibold">Contraseña</span>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                />
            </label>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-md transition-colors flex items-center justify-center"
            >
                {loading ? (
                    <div
                        style={{
                            width: 16,
                            height: 16,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <OrbitProgress color="#fff" size="small" />
                    </div>
                ) : (
                    "Ingresar"
                )}
            </button>
            <hr className="mt-2 border-t border-gray-300" />
            <p className="mt-4 text-center text-gray-600">
                ¿No tienes cuenta?{" "}
                <a
                    href="/auth/register"
                    className="text-blue-600 hover:underline font-semibold"
                >
                    Registrarme
                </a>
            </p>
        </form>
    );
}
