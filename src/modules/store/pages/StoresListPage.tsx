import React from 'react';
import { Link } from 'react-router';
import Footer from '../../shared/components/Footer';

import { STORES_MOCK as MOCK_STORES } from '../mocks/stores.mock';

export default function StoresListPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-100 mb-8 sm:mb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 flex flex-col items-center text-center">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                        Encuentra los <span className="text-blue-600">mejores corralones</span><br className="hidden sm:block" /> en tu zona
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mb-10">
                        Explorá las tiendas, compará precios y comprá materiales de construcción sin moverte de tu casa.
                    </p>

                    {/* Search Bar Placeholder */}
                    <div className="w-full max-w-xl relative flex items-center">
                        <div className="absolute inset-y-0 text-gray-400 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por nombre, rubro o material..."
                            className="block w-full pl-12 pr-4 py-4 sm:py-5 border-gray-200 rounded-2xl sm:rounded-full bg-white shadow-lg shadow-blue-500/5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-base outline-none"
                        />
                        <button className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-xl sm:rounded-full transition-colors hidden sm:block shadow-md">
                            Buscar
                        </button>
                    </div>
                </div>
            </div>

            {/* Stores Grid */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Corralones Destacados</h2>
                    <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                        {MOCK_STORES.length} tiendas disponibles
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {MOCK_STORES.map((store) => (
                        <StoreCard key={store.id} store={store} />
                    ))}
                </div>
            </main>
        </div>
    );
}

import { IStore } from '../models/IStore';

function StoreCard({ store }: { store: IStore }) {
    return (
        <Link
            to={`/${store.id}/products`}
            className="group flex flex-col bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300 relative"
        >
            {/* Banner Image */}
            <div className="h-40 w-full relative overflow-hidden bg-gray-100">
                <img
                    src={store.banner}
                    alt={`Banner de ${store.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4 flex items-center justify-center">
                    {store.isOpen ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/90 text-white backdrop-blur-sm shadow-sm border border-emerald-400/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Abierto
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-900/80 text-white backdrop-blur-sm shadow-sm border border-gray-700/50">
                            Cerrado
                        </span>
                    )}
                </div>
            </div>

            {/* Content Info */}
            <div className="flex flex-col flex-1 p-6 sm:p-8 pt-0 relative">

                {/* Logo and Name Area */}
                <div className="flex items-end gap-4 -mt-8 mb-4">
                    <div className="w-20 h-20 rounded-2xl bg-white p-2 shadow-xl shadow-gray-200/50 flex-shrink-0 z-10 border border-gray-50 group-hover:border-blue-100 transition-colors">
                        <img
                            src={store.logo}
                            alt={`Logo de ${store.name}`}
                            className="w-full h-full object-contain rounded-xl"
                        />
                    </div>
                    <div className="mb-1 flex-1 min-w-0">
                        <h3 className="text-xl font-extrabold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {store.name}
                        </h3>
                    </div>
                </div>

                {/* Rating & Short description */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md">
                        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-bold text-amber-700">{store.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">({store.reviewsCount} opiniones)</span>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {store.description}
                </p>

                {/* Tags */}
                <div className="mt-auto flex flex-wrap gap-2">
                    {(store.tags ?? []).map((tag, idx) => (
                        <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-gray-50 text-gray-600 border border-gray-100"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
