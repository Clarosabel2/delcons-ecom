import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b to-10% from-white to-[#0b172f] text-gray-200 py-10 mt-10 hidden lg:block">
            <div className="grid max-w-6xl grid-cols-1 gap-8 px-4 mx-auto sm:grid-cols-2 md:grid-cols-4">
                <div>
                    <h2 className="mb-4 text-xl font-semibold">
                        Sobre Nosotros
                    </h2>
                    <p className="text-sm">
                        Somos una tienda online dedicada a ofrecer productos de
                        calidad, con envíos rápidos y atención personalizada.
                    </p>
                </div>

                <div>
                    <h2 className="mb-4 text-xl font-semibold">Categorías</h2>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:underline">
                                Ropa
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Electrónica
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Hogar
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Ofertas
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="mb-4 text-xl font-semibold">Ayuda</h2>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:underline">
                                Preguntas frecuentes
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Envíos
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Devoluciones
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Contacto
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="mb-4 text-xl font-semibold">Síguenos</h2>
                    <div className="flex space-y-2 xl:gap-2 lg:flex-col xl:flex-row xl:space-y-0">
                        {/* <SocialItem>
                            <FaFacebookF /> Facebook
                        </SocialItem>
                        <SocialItem>
                            <ImInstagram /> Instagram
                        </SocialItem>
                        <SocialItem>
                            <FaTwitter /> Twitter
                        </SocialItem> */}
                        iconos Social
                    </div>
                </div>
            </div>

            <div className="pt-4 mt-10 text-sm text-center border-t border-gray-700">
                © {new Date().getFullYear()} TuTienda. Todos los derechos
                reservados.
            </div>
        </footer>
  )
}
