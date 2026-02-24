import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";

export default function Footer() {
    return (
        <footer className="relative pt-20 pb-10 mt-16 bg-slate-950 border-t border-white/10 hidden lg:block overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative grid max-w-7xl grid-cols-1 gap-12 px-8 mx-auto sm:grid-cols-2 lg:grid-cols-4 z-10 w-full">
                {/* Branding/About */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <img src="/logo-delcons.png" alt="Delcons Logo" className="w-[180px] brightness-0 invert opacity-90 object-contain" />
                    </div>
                    <p className="text-sm leading-relaxed text-slate-400">
                        Somos una tienda online dedicada a ofrecer productos de calidad, con envíos rápidos y atención personalizada para que tu experiencia sea inigualable.
                    </p>
                    {/* Socials */}
                    <div className="flex items-center gap-3 mt-2">
                        <SocialButton icon={<FaFacebookF />} />
                        <SocialButton icon={<ImInstagram />} />
                        <SocialButton icon={<FaTwitter />} />
                        <SocialButton icon={<FaLinkedinIn />} />
                    </div>
                </div>

                {/* Categories */}
                <div className="lg:ml-12">
                    <h3 className="mb-6 text-sm font-bold tracking-widest text-white uppercase">Categorías</h3>
                    <ul className="space-y-4 text-sm">
                        <FooterLink text="Ropa y Accesorios" />
                        <FooterLink text="Electrónica" />
                        <FooterLink text="Hogar y Jardín" />
                        <FooterLink text="Ofertas Especiales" />
                        <FooterLink text="Nuevos Ingresos" />
                    </ul>
                </div>

                {/* Help */}
                <div className="lg:ml-8">
                    <h3 className="mb-6 text-sm font-bold tracking-widest text-white uppercase">Soporte</h3>
                    <ul className="space-y-4 text-sm">
                        <FooterLink text="Centro de Ayuda" />
                        <FooterLink text="Estado de mi pedido" />
                        <FooterLink text="Políticas de Devolución" />
                        <FooterLink text="Envíos y Entregas" />
                        <FooterLink text="Términos y Condiciones" />
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="mb-6 text-sm font-bold tracking-widest text-white uppercase">Suscríbete</h3>
                    <p className="mb-4 text-sm text-slate-400">
                        Recibe las últimas ofertas y novedades directamente en tu correo.
                    </p>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
                        <input
                            type="email"
                            placeholder="Tu e-mail"
                            className="w-full px-4 py-2 text-sm text-white bg-transparent outline-none placeholder:text-slate-500"
                        />
                        <button className="px-5 py-2.5 text-sm font-bold text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-500 whitespace-nowrap">
                            Unirse
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative w-full max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 px-8 flex flex-col md:flex-row items-center justify-between gap-4 z-10">
                <p className="text-sm text-slate-500">
                    © {new Date().getFullYear()} Delcons. Todos los derechos reservados.
                </p>
                <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
                    <a href="#" className="hover:text-indigo-400 transition-colors">Privacidad</a>
                    <a href="#" className="hover:text-indigo-400 transition-colors">Términos</a>
                    <a href="#" className="hover:text-indigo-400 transition-colors">Cookies</a>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ text }: { text: string }) {
    return (
        <li>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/0 group-hover:bg-indigo-500 transition-colors" />
                {text}
            </a>
        </li>
    );
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
    return (
        <a href="#" className="flex items-center justify-center w-10 h-10 text-slate-400 bg-white/5 border border-white/10 rounded-full hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all hover:scale-110 active:scale-95">
            {icon}
        </a>
    );
}
