import React from 'react'
import { useParams, Link, useLocation } from 'react-router'
import { STORES_MOCK } from '../mocks/stores.mock'

export default function StoreHeader() {
    const { storeId } = useParams();
    const location = useLocation();
    const store = STORES_MOCK.find(s => s.id === storeId) || STORES_MOCK[0];

    if (!store) return null;

    return (
        <header className="sticky top-20 z-40 mb-8 bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-blue-50/50 pointer-events-none" />

            <div className="flex items-center justify-center sm:justify-start gap-3 relative z-10 shrink-0">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 shrink-0 overflow-hidden bg-white">
                    <img src={store.logo} alt={`Logo de ${store.name}`} className="object-contain w-full h-full" />
                </div>
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-tight line-clamp-1 truncate max-w-[200px] sm:max-w-xs md:max-w-sm">
                        {store.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium truncate max-w-[200px] sm:max-w-xs">{store.tags?.[0] || "Materiales de Construcción"}</p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 relative z-10 w-full md:w-auto">
                {store.isOpen ? (
                    <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-700">Abierto ahora</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                        <span className="text-xs font-bold text-gray-700">Cerrado</span>
                    </div>
                )}

                {/* Rating badge if available */}
                {store.rating && (
                    <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-2.5 py-1.5 rounded-lg">
                        <svg className="w-3.5 h-3.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-bold text-amber-700">{store.rating}</span>
                    </div>
                )}

                <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-lg lg:ml-2">
                    <svg className="w-3.5 h-3.5 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-600 line-clamp-1">{store.address}</span>
                </div>

                {location.pathname.endsWith('/products') ? (
                    <Link
                        to={`/${store.id}`}
                        className="ml-auto md:ml-4 flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-xl transition-colors text-xs sm:text-sm whitespace-nowrap"
                    >
                        <span>Ver detalle del local</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                ) : (
                    <Link
                        to={`/${store.id}/products`}
                        className="ml-auto md:ml-4 flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-xl transition-colors text-xs sm:text-sm whitespace-nowrap"
                    >
                        <span>Ver productos</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </Link>
                )}
            </div>
        </header>
    )
}
