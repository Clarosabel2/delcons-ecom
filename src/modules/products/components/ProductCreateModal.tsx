import React, { useEffect, useState } from "react";
import { IProduct } from "../models/IProduct";
import { getCategoryList } from "../services/productService";
import clsx from "clsx";
import { IDimensions } from "../models/IDimensions";

interface ProductCreateModalProps {
    open: boolean;
    onClose: () => void;
    onSave?: (product: IProduct) => void;
    onCreate: (product: IProduct) => void;
    productToEdit?: IProduct | null;
}

const ProductCreateModal: React.FC<ProductCreateModalProps> = ({
    open,
    onClose,
    onCreate,
    productToEdit,
}) => {
    const [product, setProduct] = useState<IProduct>({
        id: "",
        title: "",
        description: "",
        category: "",
        price: 0,
        stock: 0,
        brand: "",
        sku: "",
        availabilityStatus: "disponible",
        images: [],
        thumbnail: "",
        minimumOrderQuantity: 1,
    });
    const [categories, setCategories] = useState<string[]>([]);
    const [applyDiscount, setApplyDiscount] = useState(false);
    const [discount, setDiscount] = useState("");
    const [showDetails, setShowDetails] = useState(false);
    const [dimensions, setDimensions] = useState({
        width: "",
        height: "",
        depth: "",
    });

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await getCategoryList();
            setCategories(result);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (productToEdit) {
            setProduct({
                ...productToEdit,
                images: productToEdit.images || [],
                thumbnail: productToEdit.thumbnail || "",
            });
        }
    }, [productToEdit]);

    const [error, setError] = useState("");

    const updateProduct = (field: keyof IProduct, value: any) => {
        setProduct((prev) => ({ ...prev, [field]: value }));
    };
    const updateDimension = (field: keyof IDimensions, value: number) => {
        setProduct((prev) => ({
            ...prev,
            dimensions: {
                ...prev.dimensions,
                [field]: value,
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!product.title?.trim()) {
            setError("El nombre es requerido");
            return;
        }
        if (!product.description?.trim()) {
            setError("La descripción es requerida");
            return;
        }
        if (!product.category?.trim()) {
            setError("La categoría es requerida");
            return;
        }
        if (!product.price || product.price <= 0) {
            setError("El precio debe ser mayor a 0");
            return;
        }
        if (!product.stock || product.stock < 0) {
            setError("El stock no puede ser negativo");
            return;
        }
        if (!product.brand?.trim()) {
            setError("La marca es requerida");
            return;
        }
        if (!product.sku?.trim()) {
            setError("El SKU es requerido");
            return;
        }

        const cleanProduct: IProduct = {
            ...product,
            title: product.title?.trim(),
            description: product.description?.trim(),
            category: product.category?.trim(),
            brand: product.brand?.trim(),
            sku: product.sku?.trim(),
            thumbnail: product.thumbnail?.trim(),
        };

        if (onCreate) {
            onCreate(cleanProduct);
        }

        resetForm();
        onClose();
    };

    const resetForm = () => {
        setProduct({
            id: "",
            title: "",
            description: "",
            category: "",
            price: 0,
            stock: 0,
            brand: "",
            sku: "",
            availabilityStatus: "disponible",
            images: [],
            thumbnail: "",
        });
        setError("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4 sm:p-6 transition-all">
            <div
                className={clsx(
                    "bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl relative animate-fade-in-modal text-sm max-h-[90vh] mx-auto flex flex-col border border-gray-100",
                    showDetails ? "overflow-hidden" : "overflow-y-auto"
                )}
            >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 shrink-0">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                        {productToEdit ? "Editar Producto" : "Agregar Producto"}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 text-gray-400 bg-gray-50 rounded-full hover:bg-gray-100 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-label="Cerrar"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                {error && (
                    <div className="mb-6 flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded-xl text-sm font-medium shrink-0">
                        <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="sm:col-span-2">
                            <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">
                                Nombre (Título) <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={product.title || ""}
                                onChange={(e) =>
                                    updateProduct("title", e.target.value)
                                }
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900"
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">
                                Descripción <span className="text-rose-500">*</span>
                            </label>
                            <textarea
                                value={product.description || ""}
                                onChange={(e) =>
                                    updateProduct("description", e.target.value)
                                }
                                className="w-full h-24 border bg-gray-50/50 border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900 resize-none"
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">
                                Categoría <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={product.category}
                                onChange={(e) =>
                                    updateProduct("category", e.target.value)
                                }
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900 cursor-pointer"
                                required
                            >
                                <option value="" disabled>Selecciona una categoría</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">
                                Precio <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                                <input
                                    type="number"
                                    value={product.price || 0}
                                    onChange={(e) => updateProduct("price", Number(e.target.value))}
                                    className="w-full bg-gray-50/50 border border-gray-200 rounded-xl pl-8 pr-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900"
                                    required
                                    min={0}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">
                                Stock <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={product.stock || 0}
                                onChange={(e) => updateProduct("stock", Number(e.target.value))}
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900"
                                required
                                min={0}
                            />
                        </div>

                        <div className="sm:col-span-2 flex flex-col gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                            <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={applyDiscount}
                                        onChange={(e) => setApplyDiscount(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500/20 focus:ring-offset-0 transition-all cursor-pointer"
                                    />
                                </div>
                                <span className="text-gray-700 font-bold text-sm select-none group-hover:text-blue-700 transition-colors">
                                    Aplicar descuento especial
                                </span>
                            </label>
                            {applyDiscount && (
                                <div className="flex items-center gap-2 animate-fade-in-modal w-full sm:w-1/2">
                                    <input
                                        type="number"
                                        min={1}
                                        max={100}
                                        value={product.discountPercentage ?? ""}
                                        onChange={(e) =>
                                            setProduct((prev) => ({
                                                ...prev,
                                                discountPercentage: e.target.value === "" ? undefined : Number(e.target.value),
                                            }))
                                        }
                                        placeholder="%"
                                        className="w-24 bg-white border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-blue-900"
                                    />
                                    <span className="text-sm font-medium text-blue-800">% de descuento</span>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">
                                Marca <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={product.brand || ""}
                                onChange={(e) => updateProduct("brand", e.target.value)}
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">
                                SKU <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={product.sku || ""}
                                onChange={(e) => updateProduct("sku", e.target.value)}
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900 font-mono"
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">
                                Estado <span className="text-rose-500">*</span>
                            </label>
                            <select
                                value={product.availabilityStatus || "disponible"}
                                onChange={(e) => updateProduct("availabilityStatus", e.target.value)}
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900 cursor-pointer"
                                required
                            >
                                <option value="disponible">Disponible</option>
                                <option value="agotado">Agotado</option>
                                <option value="proximamente">Próximamente</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">
                                Imágenes (URLs, separadas por coma)
                            </label>
                            <textarea
                                value={(product.images || []).join(",\n")}
                                onChange={(e) =>
                                    updateProduct("images", e.target.value.split(/\n|,/).map((s) => s.trim()).filter(Boolean))
                                }
                                className="w-full h-20 bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900 resize-none font-mono text-xs"
                                placeholder="https://ejemplo.com/img1.jpg,&#10;https://ejemplo.com/img2.jpg"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">
                                Thumbnail (URL principal)
                            </label>
                            <input
                                type="text"
                                value={product.thumbnail || ""}
                                onChange={(e) => updateProduct("thumbnail", e.target.value)}
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900 font-mono text-xs"
                                placeholder="https://ejemplo.com/thumb.jpg"
                            />
                        </div>

                        <div className="sm:col-span-2 border-t border-gray-100 pt-4 mt-2">
                            <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={showDetails}
                                        onChange={(e) => setShowDetails(e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-200 focus:ring-offset-0 transition-all cursor-pointer"
                                    />
                                </div>
                                <span className="text-gray-900 font-bold text-sm select-none group-hover:text-gray-600 transition-colors">
                                    Agregar más detalles (Peso, dimensiones, envío...)
                                </span>
                            </label>
                        </div>
                        {showDetails && (
                            <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 border border-gray-200 rounded-2xl p-5 mt-2 bg-gray-50/80 animate-fade-in-modal">
                                <div className="sm:col-span-3">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Dimensiones y Peso</h3>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">Peso (kg)</label>
                                    <input
                                        type="number"
                                        value={product.weight || ""}
                                        onChange={(e) => updateProduct("weight", e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900"
                                        min={0}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">Ancho (cm)</label>
                                    <input
                                        type="number"
                                        value={product.dimensions?.width || ""}
                                        onChange={(e) => updateDimension("width", Number(e.target.value))}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900"
                                        min={0}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">Alto (cm)</label>
                                    <input
                                        type="number"
                                        value={product.dimensions?.height || ""}
                                        onChange={(e) => updateDimension("height", Number(e.target.value))}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900"
                                        min={0}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">Profundidad (cm)</label>
                                    <input
                                        type="number"
                                        value={product.dimensions?.depth || ""}
                                        onChange={(e) => updateDimension("depth", Number(e.target.value))}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900"
                                        min={0}
                                    />
                                </div>
                                <div className="sm:col-span-3 mt-2">
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">Políticas y Envío</h3>
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">Información de envío</label>
                                    <input
                                        type="text"
                                        value={product.shippingInformation || ""}
                                        onChange={(e) => updateProduct("shippingInformation", e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900"
                                    />
                                </div>
                                <div className="sm:col-span-3 lg:col-span-2">
                                    <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide">Política de devoluciones</label>
                                    <input
                                        type="text"
                                        value={product.returnPolicy || ""}
                                        onChange={(e) => updateProduct("returnPolicy", e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900"
                                    />
                                </div>
                                <div className="sm:col-span-3 lg:col-span-1">
                                    <label className="block text-gray-700 font-bold mb-1.5 text-xs uppercase tracking-wide truncate">Cant. mínima compra</label>
                                    <input
                                        type="number"
                                        value={product.minimumOrderQuantity || ""}
                                        onChange={(e) => updateProduct("minimumOrderQuantity", Number(e.target.value))}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-900"
                                        min={1}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Botones */}
                    <div className="sm:col-span-2 flex flex-col sm:flex-row justify-end gap-3 pt-6 pb-2 mt-4 border-t border-gray-100 shrink-0 sticky bottom-0 bg-white">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold transition-all focus:outline-none focus:ring-4 focus:ring-gray-200/50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                            onClick={handleSubmit}
                        >
                            {productToEdit ? "Actualizar Producto" : "Guardar Producto"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductCreateModal;
