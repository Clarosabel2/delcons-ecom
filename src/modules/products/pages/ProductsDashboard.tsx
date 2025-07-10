import React, { useEffect, useState } from "react";
import {
    FiSearch,
    FiPlus,
    FiFilter,
    FiEdit,
    FiTrash2,
    FiEye,
    FiShoppingBag,
    FiDollarSign,
    FiUsers,
} from "react-icons/fi";
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
    { key: "title", label: "Nombre" },
    { key: "price", label: "Precio", render: (row) => `$${row.price}` },
    {
        key: "stock",
        label: "Stock",
        render: (row) => {
            const stock = row.stock ?? 0;
            let color = "bg-green-100 text-green-800";
            let label = "Stock suficiente";
            if (stock === 0) {
                color = "bg-red-100 text-red-800";
                label = "Sin stock";
            } else if (stock > 0 && stock <= 10) {
                color = "bg-yellow-100 text-yellow-800";
                label = "Poco stock";
            }
            return (
                <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
                    {stock} <span className="ml-1">({label})</span>
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

    const actions: DataTableAction<IProduct>[] = [
        {
            label: "Ver",
            icon: <FiEye />,
            onClick: (row) => alert(`Ver ${row.title}`),
        },
        {
            label: "Editar",
            icon: <FiEdit />,
            onClick: (row) => {
                setModalOpen(true);
                setProductToEdit(row);
            },
        },
        {
            label: "Eliminar",
            icon: <FiTrash2 />,
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
            className: "text-red-600 hover:text-red-900 hover:bg-red-50",
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

    const stats: StatCardItem[] = [
        {
            label: "Productos",
            value: 120,
            icon: <FiShoppingBag />,
            color: "text-blue-600",
        },
        {
            label: "Ventas",
            value: "$5,000",
            icon: <FiDollarSign />,
            color: "text-green-600",
        },
        {
            label: "Clientes",
            value: 80,
            icon: <FiUsers />,
            color: "text-purple-600",
        },
    ];

    if (loading) return <LoadingSpinner />;
    if (error) return <div>{error}</div>;

    return (
        <>
            {successMessage && (
                <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-fade-in-modal text-sm">
                    {successMessage}
                </div>
            )}
            {/* Stats Cards */}

            <StatsCards stats={stats} />

            {/* Filtros visuales */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-1 max-w-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estado
                        </label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                            <option>Todos los estados</option>
                        </select>
                    </div>
                    <div className="flex-1 max-w-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Fecha
                        </label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-end mt-6">
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>

            {/* Search and Actions */}
            <div className="py-6 flex items-center justify-between">
                <div className="flex-1 max-w-lg">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                        <FiFilter className="h-4 w-4 mr-2" />
                        Filtros
                    </button>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <FiPlus className="h-4 w-4 mr-2" />
                        Agregar
                    </button>
                </div>
            </div>

            
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <DataTable<IProduct>
                    data={productsOwner}
                    columns={columns}
                    actions={actions}
                    selectable
                />
            </div>

            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4 rounded-lg">
                <div className="flex-1 flex justify-between sm:hidden">
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                        Anterior
                    </button>
                    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                        Siguiente
                    </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Mostrando <span className="font-medium">1</span> a{" "}
                            <span className="font-medium">10</span> de{" "}
                            <span className="font-medium">10</span> resultados
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                                Anterior
                            </button>
                            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                1
                            </button>
                            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                                Siguiente
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
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
