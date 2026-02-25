import React from 'react';
import { useParams, Link } from 'react-router';

import { STORES_MOCK } from '../mocks/stores.mock';

export default function StorePage() {
    const { storeId } = useParams();

    // Find the store by storeId (slug) or default to the first one (casa-borda)
    const store = STORES_MOCK.find(s => s.id === storeId) || STORES_MOCK[0];

    return (
        <div className="flex flex-col gap-6 lg:gap-8">
            {/* Banner Section */}
            <div className="w-full h-48 sm:h-64 lg:h-80 rounded-2xl overflow-hidden relative shadow-sm">
                <img
                    src={store.banner}
                    alt={`Banner de ${store.name}`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 text-white">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-2">{store.name}</h2>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-200 max-w-2xl hidden sm:block">
                        {store.description}
                    </p>
                </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Main Content Area (2/3 width on md+) */}
                <div className="md:col-span-2 space-y-6">
                    {/* About Section */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Sobre Nosotros</h3>
                        <p className="text-gray-600 leading-relaxed mb-6 block sm:hidden">
                            {store.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    Métodos de Pago
                                </h4>
                                <ul className="space-y-1">
                                    {store.paymentMethods.map((method, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                            {method}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                    Métodos de Envío
                                </h4>
                                <ul className="space-y-1">
                                    {store.shippingMethods.map((method, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                            {method}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for Store Products */}
                    <Link to={`/${store?.id ?? 'casa-borda'}/products`} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px] text-center hover:shadow-md hover:border-blue-200 transition-all group">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Ver Catálogo de Productos</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Explorá todos los productos exclusivos que {store.name} tiene para ofrecerte.
                        </p>
                    </Link>
                </div>

                {/* Sidebar Area (1/3 width on md+) */}
                <div className="space-y-6">
                    {/* Contact Info Widget */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Información de Contacto</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Dirección</p>
                                    <p className="text-sm text-gray-600">{store.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Teléfono</p>
                                    <p className="text-sm text-gray-600">{store.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Email</p>
                                    <a href={`mailto:${store.email}`} className="text-sm text-blue-600 hover:underline">{store.email}</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Opening Hours Widget */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
                            Horarios de Atención
                            {store.isOpen ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                                    Abierto
                                </span>
                            ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                    Cerrado
                                </span>
                            )}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between items-center py-1">
                                <span className="text-gray-600">Lunes</span>
                                <span className="font-medium text-gray-900">{store.openingHours.monday}</span>
                            </li>
                            <li className="flex justify-between items-center py-1">
                                <span className="text-gray-600">Martes</span>
                                <span className="font-medium text-gray-900">{store.openingHours.tuesday}</span>
                            </li>
                            <li className="flex justify-between items-center py-1">
                                <span className="text-gray-600">Miércoles</span>
                                <span className="font-medium text-gray-900">{store.openingHours.wednesday}</span>
                            </li>
                            <li className="flex justify-between items-center py-1">
                                <span className="text-gray-600">Jueves</span>
                                <span className="font-medium text-gray-900">{store.openingHours.thursday}</span>
                            </li>
                            <li className="flex justify-between items-center py-1">
                                <span className="text-gray-600">Viernes</span>
                                <span className="font-medium text-gray-900">{store.openingHours.friday}</span>
                            </li>
                            <li className="flex justify-between items-center py-1">
                                <span className="text-gray-600">Sábado</span>
                                <span className="font-medium text-gray-900">{store.openingHours.saturday}</span>
                            </li>
                            <li className="flex justify-between items-center py-1">
                                <span className="text-gray-600">Domingo</span>
                                <span className="font-medium text-gray-900">{store.openingHours.sunday}</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}
