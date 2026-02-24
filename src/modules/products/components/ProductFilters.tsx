import React, { useEffect, useState } from "react";
import { Star, Filter, Check, X } from "lucide-react";
import clsx from "clsx";

type Props = {
    categories: string[];
    categoriesSelected: string[];
    setCategoriesSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ProductFilters({
    categories,
    categoriesSelected,
    setCategoriesSelected,
}: Props) {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [showMobile, setShowMobile] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const panel = document.getElementById("filter-panel");
            if (showMobile && panel && !panel.contains(event.target as Node)) {
                setShowMobile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [showMobile]);

    useEffect(() => {
        if (showMobile) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [showMobile]);

    const handleResetFilters = () => {
        setPriceRange([0, 1000]);
        setCategoriesSelected([]);
    };

    return (
        <div className="relative">
            {/* Desktop Panel */}
            <div className="hidden lg:block sticky top-24 z-30">
                <div className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-xl shadow-gray-200/50 rounded-2xl p-6 transition-all duration-300">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Filter className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Filtros</h2>
                        </div>
                        {categoriesSelected.length > 0 && (
                            <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                {categoriesSelected.length} activos
                            </span>
                        )}
                    </div>
                    <FilterContent
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        categories={categories}
                        selectedCategories={categoriesSelected}
                        setSelectedCategories={setCategoriesSelected}
                        handleResetFilters={handleResetFilters}
                    />
                </div>
            </div>

            {/* Mobile Elements */}
            <div className="lg:hidden">
                {/* Floating Button */}
                <button
                    className="fixed flex items-center justify-center gap-2 px-6 py-4 text-white font-medium tracking-wide transition-all duration-300 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 bottom-6 right-6 bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 z-40"
                    onClick={() => setShowMobile(true)}
                    style={{ transform: "translateZ(0)" }}
                >
                    <Filter className="w-5 h-5" />
                    <span>Filtros</span>
                    {categoriesSelected.length > 0 && (
                        <span className="flex items-center justify-center w-6 h-6 ml-1 text-xs font-bold text-blue-600 bg-white rounded-full">
                            {categoriesSelected.length}
                        </span>
                    )}
                </button>

                {/* Overlay */}
                <div
                    className={clsx(
                        "fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 z-50",
                        showMobile ? "opacity-100" : "opacity-0 pointer-events-none"
                    )}
                    onClick={() => setShowMobile(false)}
                />

                {/* Mobile Panel */}
                <div
                    id="filter-panel"
                    className={clsx(
                        "fixed top-0 right-0 h-[100dvh] w-[85vw] sm:w-[350px] transform transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] bg-white shadow-2xl z-50 rounded-l-3xl flex flex-col",
                        showMobile ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Filter className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Filtros
                            </h2>
                        </div>
                        <button
                            onClick={() => setShowMobile(false)}
                            className="p-2 text-gray-400 transition-colors bg-gray-50 rounded-full hover:bg-gray-100 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 pb-24 custom-scrollbar">
                        <FilterContent
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            categories={categories}
                            selectedCategories={categoriesSelected}
                            setSelectedCategories={setCategoriesSelected}
                            handleResetFilters={handleResetFilters}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface FilterContentProps {
    priceRange: [number, number];
    setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
    categories: string[];
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
    handleResetFilters: () => void;
}

function FilterContent({
    priceRange,
    setPriceRange,
    categories,
    selectedCategories,
    setSelectedCategories,
    handleResetFilters,
}: FilterContentProps) {
    const handleCheckboxChange = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter((c) => c !== category)
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Categorías */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase">
                    Categorías
                </h3>
                <div className="flex flex-col gap-1">
                    {categories.map((category) => {
                        const isSelected = selectedCategories.includes(category);
                        return (
                            <label
                                key={category}
                                className={clsx(
                                    "group flex items-center py-0.5 justify-between rounded-lg cursor-pointer transition-all duration-200 border px-3",
                                    isSelected
                                        ? "bg-blue-50 border-blue-200"
                                        : "bg-transparent border-transparent hover:bg-gray-50 hover:border-gray-200"
                                )}
                            >
                                <span
                                    className={clsx(
                                        "text-sm font-medium transition-colors line-clamp-1 py-1.5",
                                        isSelected ? "text-blue-700" : "text-gray-600 group-hover:text-gray-900"
                                    )}
                                    title={category}
                                >
                                    {category}
                                </span>
                                <div
                                    className={clsx(
                                        "w-4 h-4 shrink-0 rounded flex items-center justify-center transition-all duration-200 ml-2",
                                        isSelected
                                            ? "bg-blue-600 border-0 shadow-sm"
                                            : "bg-white border-[1.5px] border-gray-300 group-hover:border-blue-400"
                                    )}
                                >
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={isSelected}
                                        onChange={() => handleCheckboxChange(category)}
                                    />
                                    <Check
                                        className={clsx(
                                            "w-3 h-3 text-white transition-opacity duration-200",
                                            isSelected ? "opacity-100" : "opacity-0"
                                        )}
                                        strokeWidth={3}
                                    />
                                </div>
                            </label>
                        );
                    })}
                    {categories.length === 0 && (
                        <p className="text-sm text-gray-400 italic px-2">No hay categorías disponibles</p>
                    )}
                </div>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            {/* Rango de Precio */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase">
                    Rango de Precio
                </h3>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label className="text-xs text-gray-500 mb-1.5 block font-medium">Mínimo</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                                <input
                                    type="number"
                                    value={priceRange[0]}
                                    onChange={(e) =>
                                        setPriceRange([
                                            Math.min(parseInt(e.target.value) || 0, priceRange[1]),
                                            priceRange[1],
                                        ])
                                    }
                                    className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-gray-500 mb-1.5 block font-medium">Máximo</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                                <input
                                    type="number"
                                    value={priceRange[1]}
                                    onChange={(e) =>
                                        setPriceRange([
                                            priceRange[0],
                                            Math.max(parseInt(e.target.value) || 0, priceRange[0]),
                                        ])
                                    }
                                    className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            {/* Valoración */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-wider text-gray-400 uppercase">
                    Valoración
                </h3>
                <div className="space-y-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <label
                            key={rating}
                            className="group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 rounded bg-white border-[1.5px] border-gray-300 flex items-center justify-center group-hover:border-blue-400 transition-colors">
                                    <input type="checkbox" className="sr-only" />
                                    {/* Podría manejarse estado visual de checked aquí */}
                                    <Check className="w-3 h-3 text-white opacity-0 transition-opacity" strokeWidth={3} />
                                </div>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <Star
                                            key={index}
                                            className={clsx(
                                                "w-4 h-4 transition-colors",
                                                index < rating
                                                    ? "fill-amber-400 text-amber-400"
                                                    : "text-gray-200 fill-gray-200"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                            {rating < 5 && (
                                <span className="text-xs text-gray-400 font-medium">y más</span>
                            )}
                        </label>
                    ))}
                </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col gap-3 pt-6 mt-2 border-t border-gray-100">
                <button className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 transition-all outline-none focus:ring-2 focus:ring-blue-500/50">
                    Aplicar Filtros
                </button>
                <button
                    onClick={handleResetFilters}
                    className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 transition-all outline-none focus:ring-2 focus:ring-gray-200"
                >
                    Limpiar Todo
                </button>
            </div>
        </div>
    );
}

