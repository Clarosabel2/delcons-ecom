import React, { useEffect, useState } from "react";
import ScrollToTop from "../../shared/utils/ScrollToTop";
import { useParams } from "react-router";
import { IProduct } from "../models/IProduct";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ProductRatingStar from "../components/ProductRatingStart";
import Button from "../../shared/components/Button";
import { CirclePlus, ShieldCheck, Truck, PackageCheck, Info } from "lucide-react";
import CartPhone from "../../cart/components/CartPhone";
import { useCart } from "../../cart/hooks/useCart";
import { Item } from "../../cart/models/Cart";
import QuantitySelector from "../../shared/components/QuantitySelector";
import { getProductById } from "../services/products.service";
import clsx from "clsx";

export default function ProductDetailPage() {
    const { id } = useParams();

    const [quantity, setQuantity] = useState<number>(1);
    const [product, setProduct] = useState<IProduct>();
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await getProductById(id!);
                setProduct(res);
            } catch (error) {
                console.error("Error al cargar el producto:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <ScrollToTop />

            {loading && (
                <div className="flex items-center justify-center w-full h-screen">
                    <LoadingSpinner />
                </div>
            )}

            {!loading && !product && (
                <div className="flex flex-col items-center justify-center w-full h-[70vh] gap-4">
                    <div className="p-6 bg-white rounded-full shadow-sm">
                        <PackageCheck className="w-12 h-12 text-gray-300" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Producto no encontrado</h1>
                    <p className="text-gray-500">El producto que buscas no existe o ha sido retirado.</p>
                </div>
            )}

            {!loading && product && (
                <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <ProductDetails
                        product={product}
                        quantity={quantity}
                        onQuantityChange={setQuantity}
                        onAddToCart={addItem}
                    />
                    <CartPhone />
                </div>
            )}
        </div>
    );
}

interface ProductDetailsProps {
    product: IProduct;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    onAddToCart: (item: Item) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    product,
    quantity,
    onQuantityChange,
    onAddToCart,
}) => {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="flex flex-col gap-12">
            {/* Top Section: Images and Main Info */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden flex flex-col lg:flex-row">

                {/* Images Section */}
                <div className="p-6 lg:p-10 lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/50">
                    <div className="relative aspect-square rounded-2xl bg-white border border-gray-100 overflow-hidden flex items-center justify-center mb-6 shadow-sm group">
                        <img
                            src={product?.images[activeImage]}
                            alt={product?.title}
                            className="object-contain w-full h-full p-8 transition-transform duration-500 group-hover:scale-110"
                        />
                        {product?.discountPercentage && (
                            <div className="absolute top-6 right-6 bg-rose-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg shadow-rose-500/30 tracking-wider z-10">
                                -{Math.round(product.discountPercentage)}%
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {product?.images && product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={clsx(
                                        "relative aspect-square rounded-xl bg-white border overflow-hidden transition-all duration-300",
                                        activeImage === idx
                                            ? "border-blue-500 ring-2 ring-blue-500/20 shadow-md"
                                            : "border-gray-200 hover:border-blue-300 hover:shadow-sm opacity-70 hover:opacity-100"
                                    )}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.title} ${idx + 1}`}
                                        className="object-contain w-full h-full p-2"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="p-6 lg:p-12 lg:w-1/2 flex flex-col">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-3 py-1.5 rounded-md">
                                {product?.category}
                            </span>
                            {product?.brand && (
                                <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                                    • {product.brand}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                            {product?.title}
                        </h1>
                        <div className="flex items-center flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                <ProductRatingStar rate={product.rating ?? 0} className="text-amber-400" />
                                <span className="font-medium text-gray-600 ml-1">{product.rating}</span>
                                {product.reviews && product.reviews.length > 0 && (
                                    <a href="#reviews" className="text-blue-600 hover:text-blue-700 ml-1 hover:underline transition-colors">
                                        ({product.reviews.length} opiniones)
                                    </a>
                                )}
                            </div>
                            <span className="text-gray-400 font-medium">SKU: {product?.sku}</span>
                        </div>
                    </div>

                    <hr className="border-gray-100 mb-8" />

                    {/* Price and Add to Cart */}
                    <div className="mb-8">
                        <div className="flex items-end gap-3 mb-6">
                            <span className="text-2xl font-bold text-gray-400 mb-1">$</span>
                            <span className="text-5xl font-extrabold text-gray-900 tracking-tight">
                                {product?.price}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-1.5 shrink-0 flex items-center justify-center">
                                <QuantitySelector
                                    className="w-10 h-10 border-none bg-transparent"
                                    value={quantity}
                                    onChange={onQuantityChange}
                                />
                            </div>
                            <button
                                onClick={() => onAddToCart(new Item(quantity, product))}
                                className={clsx(
                                    "flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300",
                                    (product?.stock ?? 0) > 0
                                        ? "bg-gray-900 text-white hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 active:scale-95"
                                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                )}
                                disabled={(product?.stock ?? 0) === 0}
                            >
                                <CirclePlus className="w-6 h-6" />
                                {(product?.stock ?? 0) > 0 ? "Agregar al Carrito" : "Agotado"}
                            </button>
                        </div>
                        {(product?.stock ?? 0) > 0 && (product?.stock ?? 0) <= 5 && (
                            <p className="text-rose-500 text-sm font-medium mt-3 flex items-center gap-1.5">
                                <Info className="w-4 h-4" /> ¡Solo quedan {product?.stock} disponibles!
                            </p>
                        )}
                    </div>

                    <hr className="border-gray-100 mb-8" />

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-4 mt-auto">
                        <FeatureItem
                            icon={<PackageCheck className="w-5 h-5 text-blue-500" />}
                            title="Estado"
                            desc={product?.availabilityStatus}
                        />
                        <FeatureItem
                            icon={<Truck className="w-5 h-5 text-blue-500" />}
                            title="Envío"
                            desc={product?.shippingInformation || "Envío estándar"}
                        />
                        <FeatureItem
                            icon={<ShieldCheck className="w-5 h-5 text-blue-500" />}
                            title="Garantía"
                            desc={product?.warrantyInformation || "Garantía del fabricante"}
                        />
                        <FeatureItem
                            icon={<Info className="w-5 h-5 text-blue-500" />}
                            title="Stock"
                            desc={`${product?.stock} unidades`}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Section: Details and Reviews */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Product Description and Specs */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <div className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-lg shadow-blue-900/5 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            Descripción
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {product?.description}
                        </p>

                        {/* Tags */}
                        {product?.tags && product.tags.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <div className="flex flex-wrap gap-2">
                                    {product.tags.map((tag, index) => (
                                        <span key={index} className="px-4 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Specs Table */}
                    <div className="bg-white rounded-[2rem] p-8 lg:p-10 shadow-lg shadow-blue-900/5 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                            Especificaciones
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                            <SpecRow label="Peso" value={`${product?.weight}g`} />
                            {product?.dimensions && (
                                <SpecRow
                                    label="Dimensiones"
                                    value={`${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`}
                                />
                            )}
                            <SpecRow label="SKU" value={product?.sku} />
                            <SpecRow label="Marca" value={product?.brand} />
                            <SpecRow label="Categoría" value={product?.category} />
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                {product?.reviews && product.reviews.length > 0 && (
                    <div className="lg:col-span-1" id="reviews">
                        <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-blue-900/5 border border-gray-100 sticky top-28">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                                Reseñas ({product.reviews.length})
                            </h2>
                            <div className="flex flex-col gap-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                {product.reviews.map((review, index) => (
                                    <div key={index} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="font-bold text-gray-900">{review.reviewerName}</p>
                                            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                                                {new Date(review.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="mb-3">
                                            <ProductRatingStar rate={review.rating} className="text-amber-400 text-sm" />
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed italic">
                                            "{review.comment}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </div>
    );
};

const FeatureItem = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc?: string }) => (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
        <div className="mt-0.5 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
            {icon}
        </div>
        <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{title}</p>
            <p className="text-sm font-medium text-gray-800 leading-snug">{desc}</p>
        </div>
    </div>
);

const SpecRow = ({ label, value }: { label: string; value?: string }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
        <span className="text-gray-500 font-medium">{label}</span>
        <span className="text-gray-900 font-semibold text-right">{value || '-'}</span>
    </div>
);
