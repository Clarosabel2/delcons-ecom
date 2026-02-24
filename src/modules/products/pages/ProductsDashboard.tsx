import React, { useEffect, useState } from "react";
import {
    Search,
    Plus,
    Filter,
    Edit2,
    Trash2,
    Eye,
    ShoppingBag,
    DollarSign,
    Users,
} from "lucide-react";
import StatsCards, { StatCardItem } from "../../shared/components/StatsCards";
import DataTable, {
    DataTableAction,
    DataTableColumn,
} from "../../shared/components/DataTable";
import ProductCreateModal from "../components/ProductCreateModal";
import {
    addProduct,
    deleteProductById,
    getAllProductsByCurrentUser,
    updateProductById,
} from "../services/products.service";
import { IProduct } from "../models/IProduct";
import LoadingSpinner from "../../shared/components/LoadingSpinner";

const columns: DataTableColumn<IProduct>[] = [
    {
        key: "img",
        label: "Imagen",
        render: (row) => (
            <img
                src={row.images[0]}
                alt={row.title}
                className="w-16 h-16 object-contain rounded"
            />
        ),
    },
    { key: "title", label: "Nombre" },
    { key: "price", label: "Precio", render: (row) => `$${row.price}` },
    {
        key: "stock",
        label: "Stock",
        render: (row) => {
            const stock = row.stock ?? 0;
            let color = "bg-green-50 text-green-700 ring-1 ring-green-600/20";
            let label = "Stock";
            if (stock === 0) {
                color = "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20";
                label = "Sin stock";
            } else if (stock > 0 && stock <= 10) {
                color = "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20";
                label = "Poco stock";
            }
            return (
                <span
                    className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${color}`}
                >
                    {stock} <span className="ml-1 hidden sm:inline-block">({label})</span>
                </span>
            );
        },
    },
    { key: "category", label: "Categoria" },
];

export default function ProductsDashboard() {
    const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
    const [productsOwner, setProductsOwner] = useState<IProduct[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("none");

    const actions: DataTableAction<IProduct>[] = [
        {
            label: "Ver",
            icon: <Eye className="w-4 h-4" />,
            onClick: (row) => alert(`Ver ${row.title}`),
        },
        {
            label: "Editar",
            icon: <Edit2 className="w-4 h-4" />,
            onClick: (row) => {
                setModalOpen(true);
                setProductToEdit(row);
            },
        },
        {
            label: "Eliminar",
            icon: <Trash2 className="w-4 h-4" />,
            onClick: async (row) => {
                if (!row.id)
                    return alert("Producto sin ID, no se puede eliminar.");

                const confirmDelete = window.confirm(`¿Eliminar ${row.title}?`);
                if (!confirmDelete) return;

                try {
                    await deleteProductById(row.id);
                    alert(`Producto ${row.title} eliminado.`);
                    await fetchProducts();
                } catch (error) {
                    alert("Error al eliminar el producto.");
                    console.error(error);
                }
            },
            className: "text-rose-600 hover:text-rose-700 hover:bg-rose-50",
        },
    ];

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await getAllProductsByCurrentUser();
            setProductsOwner(res);
        } catch (err) {
            setError("Error al cargar productos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

            return () => clearTimeout(timer); // limpia el timeout si el componente se desmonta
        }
    }, [successMessage]);

    // Lógica de filtrado y ordenamiento en el cliente
    const filteredAndSortedProducts = React.useMemo(() => {
        let result = [...productsOwner];

        // Filtro de búsqueda textual en título y SKU/categoría
        if (searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    (p.title && p.title.toLowerCase().includes(query)) ||
                    (p.category && p.category.toLowerCase().includes(query)) ||
                    (p.sku && p.sku.toLowerCase().includes(query))
            );
        }

        // Filtro de Estado de Stock
        if (statusFilter === "in_stock") {
            result = result.filter((p) => (p.stock ?? 0) > 0);
        } else if (statusFilter === "out_of_stock") {
            result = result.filter((p) => (p.stock ?? 0) === 0);
        }

        // Ordenamiento
        switch (sortBy) {
            case "stock_asc":
                result.sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0));
                break;
            case "stock_desc":
                result.sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0));
                break;
            case "price_asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price_desc":
                result.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        return result;
    }, [productsOwner, searchQuery, statusFilter, sortBy]);

    const stats: StatCardItem[] = [
        {
            label: "Productos",
            value: productsOwner.length,
            icon: <ShoppingBag className="w-6 h-6" />,
            color: "text-blue-600",
        }
    ];

    if (loading) return <LoadingSpinner />;
    if (error) return <div>{error}</div>;

    return (
        <>
            {successMessage && (
                <div className="fixed top-24 right-6 z-50 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-lg shadow-green-900/10 animate-fade-in-modal text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    {successMessage}
                </div>
            )}

            {/* Stats Cards */}
            <div className="mb-6 w-full">
                <StatsCards stats={stats} />
            </div>

            {/* Panel Principal */}
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-xl shadow-gray-200/40 rounded-3xl overflow-hidden transition-all duration-300">

                {/* Filtros visuales */}
                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex flex-col sm:flex-row items-end gap-4">
                        <div className="w-full sm:w-64">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                                Estado de Stock
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                            >
                                <option value="all">Todos los productos</option>
                                <option value="in_stock">Solo en stock</option>
                                <option value="out_of_stock">Agotados</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-64">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                                Ordenar Por
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                            >
                                <option value="none">Por defecto (Recientes)</option>
                                <option value="stock_asc">Stock: Menor a Mayor</option>
                                <option value="stock_desc">Stock: Mayor a Menor</option>
                                <option value="price_asc">Precio: Menor a Mayor</option>
                                <option value="price_desc">Precio: Mayor a Menor</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Botón Agregar Desktop (Oculto en móvil) */}
                <div className="px-6 py-5 hidden md:flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100">
                    <div className="w-full md:flex-1 max-w-lg">
                        <div className="relative group">
                            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 h-5 w-5 transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200/50 transition-all shadow-sm hover:shadow-md">
                            <Filter className="h-4 w-4 mr-2 text-gray-500" />
                            Filtros
                        </button>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="flex-1 md:flex-none inline-flex items-center justify-center px-5 py-2.5 border border-transparent rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5"
                        >
                            <Plus className="h-4 w-4 mr-2" strokeWidth={3} />
                            Agregar Producto
                        </button>
                    </div>
                </div>

                {/* Tabla Desktop (Oculto en móvil) */}
                <div className="w-full overflow-x-auto hidden md:block">
                    <DataTable<IProduct>
                        data={filteredAndSortedProducts}
                        columns={columns}
                        actions={actions}
                        selectable
                    />
                </div>

                {/* Tarjetas Móvil (Oculto en Desktop) */}
                <div className="md:hidden flex flex-col gap-4 p-4 bg-gray-50">
                    {/* Buscador móvil */}
                    <div className="relative group w-full mb-2">
                        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
                        />
                    </div>

                    {filteredAndSortedProducts.length === 0 && (
                        <div className="text-center py-10 text-gray-500 font-medium">
                            No se encontraron productos.
                        </div>
                    )}

                    {filteredAndSortedProducts.map((product) => {
                        const stock = product.stock ?? 0;
                        let color = "bg-green-50 text-green-700 ring-green-600/20";
                        let stockLabel = "En stock";
                        if (stock === 0) {
                            color = "bg-rose-50 text-rose-700 ring-rose-600/20";
                            stockLabel = "Agotado";
                        } else if (stock <= 10) {
                            color = "bg-amber-50 text-amber-700 ring-amber-600/20";
                            stockLabel = "Poco";
                        }

                        return (
                            <div key={product.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex gap-4 relative overflow-hidden">
                                {/* Imagen */}
                                <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                                    {product.images?.[0] ? (
                                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <ShoppingBag className="w-8 h-8 text-gray-300" />
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight mb-1">{product.title}</h3>
                                        <p className="text-[10px] font-bold tracking-wider text-blue-600 uppercase mb-2">{product.category}</p>
                                    </div>
                                    <div className="flex items-end justify-between mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 font-medium">Precio</span>
                                            <span className="font-extrabold text-gray-900 text-lg leading-none">${product.price}</span>
                                        </div>
                                        <div className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide ring-1 ring-inset ${color}`}>
                                            {stock} {stockLabel}
                                        </div>
                                    </div>
                                </div>

                                {/* Menu / Actions Móvil */}
                                <div className="absolute right-3 top-3 flex gap-2">
                                    <button
                                        onClick={() => {
                                            setModalOpen(true);
                                            setProductToEdit(product);
                                        }}
                                        className="p-1.5 text-gray-400 bg-gray-50 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={async () => {
                                            if (!product.id) return;
                                            if (window.confirm(`¿Eliminar ${product.title}?`)) {
                                                await deleteProductById(product.id);
                                                fetchProducts();
                                            }
                                        }}
                                        className="p-1.5 text-gray-400 bg-gray-50 rounded-lg hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination (Desktop) */}
                <div className="bg-gray-50/50 px-6 py-4 hidden sm:flex items-center justify-between border-t border-gray-100">
                    <div className="flex-1 flex justify-between sm:hidden w-full">
                        <button className="relative inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm">
                            Anterior
                        </button>
                        <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm">
                            Siguiente
                        </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between w-full">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Mostrando <span className="font-bold text-gray-900">1</span> a{" "}
                                <span className="font-bold text-gray-900">10</span> de{" "}
                                <span className="font-bold text-gray-900">10</span> resultados
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px bg-white border border-gray-200 overflow-hidden">
                                <button className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors border-r border-gray-200">
                                    Anterior
                                </button>
                                <button className="relative inline-flex items-center px-4 py-2 bg-blue-50 text-sm font-bold text-blue-700 hover:bg-blue-100 transition-colors border-r border-gray-200">
                                    1
                                </button>
                                <button className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
                                    Siguiente
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Button Móvil (Agregar) */}
            <button
                onClick={() => setModalOpen(true)}
                className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-transform z-40"
            >
                <Plus className="w-6 h-6" strokeWidth={3} />
            </button>

            {modalOpen && (
                <ProductCreateModal
                    productToEdit={productToEdit}
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                        setProductToEdit(null);
                    }}
                    onCreate={async (productData) => {
                        try {
                            if (productToEdit && productToEdit.id) {
                                await updateProductById(
                                    productToEdit.id,
                                    productData
                                );
                                setSuccessMessage(
                                    "¡Producto actualizado exitosamente!"
                                );
                            } else {
                                await addProduct(productData);
                                setSuccessMessage(
                                    "¡Producto creado exitosamente!"
                                );
                            }
                            await fetchProducts();
                            console.log(productData);
                        } catch (error) {
                            console.error(
                                "Error al guardar el producto:",
                                error
                            );
                        }
                    }}
                />
            )}
        </>
    );
}
