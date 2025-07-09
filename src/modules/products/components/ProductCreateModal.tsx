import React, { useEffect, useState } from "react";
import { IProduct } from "../models/IProduct";
import { getCategoryList } from "../services/productService";

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
    const [categories, setCategories] = useState<string[]>([]);

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

    // Función genérica para actualizar el producto
    const updateProduct = (field: keyof IProduct, value: any) => {
        setProduct((prev) => ({ ...prev, [field]: value }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validaciones básicas
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

        // Limpiar espacios en blanco
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

        // Limpiar el formulario
        resetForm();
        onClose();
    };

    // Función para resetear el formulario
    const resetForm = () => {
        setProduct({
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

    // Función para cerrar el modal
    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-fade-in-modal text-sm">
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-lg"
                    aria-label="Cerrar"
                >
                    ×
                </button>
                <h2 className="text-xl font-bold mb-3 text-gray-800">
                    {productToEdit ? "Editar Producto" : "Agregar Producto"}
                </h2>
                {error && (
                    <div className="mb-2 text-red-600 bg-red-100 p-2 rounded text-xs">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 text-xs">
                            Nombre (Título){" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={product.title || ""}
                            onChange={(e) =>
                                updateProduct("title", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 text-xs">
                            Descripción <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={product.description || ""}
                            onChange={(e) =>
                                updateProduct("description", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 text-xs">
                            Categoría <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={product.category}
                            onChange={(e) =>
                                updateProduct("category", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                            required
                        >
                            <option value="" disabled>
                                Selecciona una categoría
                            </option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-gray-700 font-medium mb-1 text-xs">
                                Precio <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={product.price || 0}
                                onChange={(e) =>
                                    updateProduct(
                                        "price",
                                        Number(e.target.value)
                                    )
                                }
                                className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                                required
                                min={0}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 font-medium mb-1 text-xs">
                                Stock <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                value={product.stock || 0}
                                onChange={(e) =>
                                    updateProduct(
                                        "stock",
                                        Number(e.target.value)
                                    )
                                }
                                className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                                required
                                min={0}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 text-xs">
                            Marca <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={product.brand || ""}
                            onChange={(e) =>
                                updateProduct("brand", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 text-xs">
                            SKU <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={product.sku || ""}
                            onChange={(e) =>
                                updateProduct("sku", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 text-xs">
                            Estado <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={product.availabilityStatus || "disponible"}
                            onChange={(e) =>
                                updateProduct(
                                    "availabilityStatus",
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                            required
                        >
                            <option value="disponible">Disponible</option>
                            <option value="agotado">Agotado</option>
                            <option value="proximamente">Próximamente</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 text-xs">
                            Imágenes (URLs, separadas por coma)
                        </label>
                        <input
                            type="text"
                            value={(product.images || []).join(", ")}
                            onChange={(e) =>
                                updateProduct(
                                    "images",
                                    e.target.value
                                        .split(",")
                                        .map((s) => s.trim())
                                        .filter(Boolean)
                                )
                            }
                            className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 text-xs">
                            Thumbnail (URL)
                        </label>
                        <input
                            type="text"
                            value={product.thumbnail || ""}
                            onChange={(e) =>
                                updateProduct("thumbnail", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                            placeholder="https://..."
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm"
                            onClick={handleSubmit}
                        >
                            {productToEdit ? "Actualizar" : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductCreateModal;
