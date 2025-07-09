import React, { useState } from "react";

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
        <form
            onSubmit={handleSubmit}
            className="bg-white max-w-md mx-auto mt-20"
        >
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Crear cuenta
            </h2>

            {error && (
                <div className="mb-4 text-red-600 font-semibold bg-red-100 p-3 rounded">
                    {error}
                </div>
            )}

            <div className="flex gap-4 mb-4">
                <label className="flex-1 block">
                    <span className="text-gray-700 font-semibold">Nombre</span>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Tu nombre"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                </label>
                <label className="flex-1 block">
                    <span className="text-gray-700 font-semibold">
                        Apellido
                    </span>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Tu apellido"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                </label>
            </div>

            <label className="block mb-4">
                <span className="text-gray-700 font-semibold">Email</span>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                />
            </label>

            <label className="block mb-4">
                <span className="text-gray-700 font-semibold">Contraseña</span>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                    minLength={6}
                />
            </label>

            <label className="block mb-6">
                <span className="text-gray-700 font-semibold">
                    Confirmar contraseña
                </span>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                    minLength={6}
                />
            </label>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-md transition-colors"
            >
                {loading ? "Registrando..." : "Crear cuenta"}
            </button>
            <hr className="mt-2 border-t border-gray-300" />
            <p className="mt-4 text-center text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <a
                    href="/auth"
                    className="text-blue-600 hover:underline font-semibold"
                >
                    Iniciar sesión
                </a>
            </p>
        </form>
    );
}
