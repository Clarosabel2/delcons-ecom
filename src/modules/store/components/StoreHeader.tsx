import React from 'react'

export default function StoreHeader() {
    return (
        <header className="sticky top-20 z-40 mb-8 bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-blue-50/50 pointer-events-none" />

            <div className="flex items-center justify-center sm:justify-start gap-3 relative z-10 shrink-0">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 shrink-0 overflow-hidden">
                    <img src="/casa_borda_logo.png" alt="" className="object-contain" />
                </div>
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        Casa Borda
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">Materiales de Construcción</p>
                </div>
            </div>


            <div className="flex flex-wrap items-center gap-2 sm:gap-3 relative z-10 w-full md:w-auto">

                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-700">Abierto ahora</span>
                </div>


                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 px-2.5 py-1.5 rounded-lg" title="Alta demanda actual">
                    <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-bold text-amber-700">Envíos con ligera demora</span>
                </div>

                <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-lg lg:ml-2">
                    <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-600">Av. San Martín 1542, Centro</span>
                </div>
            </div>
        </header>
    )
}
