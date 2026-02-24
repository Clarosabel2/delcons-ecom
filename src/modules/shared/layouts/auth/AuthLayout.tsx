import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../../auth/hooks/useAuth";

export default function AuthLayout() {
    const { isLogin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogin) {
            navigate("/");
        }
    }, [isLogin, navigate]);

    return (
        <div className="relative h-screen w-full flex flex-col md:flex-row bg-slate-50 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Imagen/ilustración Area */}
            <div className="relative w-full md:w-1/2 hidden md:flex flex-col items-center justify-center p-8 md:p-12 z-10 h-full">
                <div className="relative bg-white/40 backdrop-blur-3xl rounded-[3rem] p-12 shadow-2xl shadow-blue-900/5 border border-white/50 w-full max-w-lg aspect-square flex flex-col items-center justify-center">
                    {/* Inner subtle glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-[3rem] pointer-events-none" />

                    <img
                        src="/logo_large.png"
                        alt="Auth Illustration"
                        className="w-full max-w-[280px] object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                    />

                    <div className="mt-12 text-center space-y-3">
                        <h3 className="text-2xl font-bold text-gray-800">Tu tienda de confianza</h3>
                        <p className="text-gray-500 font-medium">Los mejores productos con envío a todo el país.</p>
                    </div>
                </div>
            </div>

            {/* Formulario Area */}
            <div className="relative flex flex-col justify-between items-center w-full md:w-1/2 h-full z-10 bg-white/60 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-l border-white/40 overflow-y-auto px-4 sm:px-8">

                <div className="w-full flex-grow flex flex-col justify-center items-center py-8">
                    <div className="w-full max-w-md bg-white/90 md:bg-white backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-white/60 px-8 py-10 sm:px-12 animate-fade-in-modal transition-all">

                        {/* Header Píldora Promocional (Opcional) */}
                        <div className="flex justify-center mb-6">
                            <span className="bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-blue-100">
                                Acceso Seguro
                            </span>
                        </div>

                        <div className="flex flex-col items-center mb-8">
                            <img
                                src="/logo-delcons.png"
                                alt="Logo"
                                className="w-16 h-16 mb-4 drop-shadow-md rounded-2xl md:hidden"
                            />
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 text-center tracking-tight">
                                Bienvenido
                            </h2>
                            <p className="text-gray-500 text-sm text-center font-medium max-w-[280px]">
                                Ingresa a tu cuenta o regístrate para continuar comprando.
                            </p>
                        </div>

                        <div className="w-full">
                            <Outlet />
                        </div>
                    </div>
                </div>

                {/* Footer simple on Auth */}
                <div className="w-full text-center text-xs font-medium text-gray-400 pb-8 shrink-0">
                    &copy; {new Date().getFullYear()} Delcons. Todos los derechos reservados.
                </div>
            </div>
        </div>
    );
}
