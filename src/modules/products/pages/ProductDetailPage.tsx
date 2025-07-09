import React, { useEffect, useState } from "react";
import ScrollToTop from "../../shared/utils/ScrollToTop";
import { useParams } from "react-router";
import { IProduct } from "../models/IProduct";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ProductRatingStar from "../components/ProductRatingStart";
import Button from "../../shared/components/Button";
import { CirclePlus } from "lucide-react";
import CartPhone from "../../cart/components/CartPhone";
import { useCart } from "../../cart/hooks/useCart";
import { Item } from "../../cart/models/Cart";
import QuantitySelector from "../../shared/components/QuantitySelector";
import { getProductById } from "../services/products.service";

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
        <div>
            <ScrollToTop />
            {loading && <LoadingSpinner />}
            {!loading && !product && (
                <div className="flex items-center justify-center w-full h-screen">
                    <h1 className="text-2xl">No se encontró el producto</h1>
                </div>
            )}
            {!loading && product && (
                <div className="min-h-screen py-12 bg-gray-100">
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
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    product,
    quantity,
    onQuantityChange,
    onAddToCart,
}) => {
    return (
        <div className="container mx-auto overflow-hidden bg-white shadow-lg rounded-xl">
            <div className="flex flex-col lg:flex-row">
                {/* Sección de imágenes */}
                <div className="p-8 bg-white lg:w-1/2">
                    <div className="overflow-hidden rounded-lg aspect-square">
                        <img
                            src={product?.images[0]}
                            alt={product?.title}
                            className="object-contain w-full h-full"
                        />
                    </div>
                    {/* Galería de miniaturas si hay más imágenes */}
                    {product?.images && product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2 mt-4">
                            {product.images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="overflow-hidden rounded-md cursor-pointer aspect-square hover:opacity-75"
                                >
                                    <img
                                        src={img}
                                        alt={`${product.title} ${idx + 1}`}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sección de información */}
                <div className="p-8 bg-white lg:w-1/2">
                    {/* Encabezado del producto */}
                    <div className="pb-6 border-b">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">
                            {product?.title}
                        </h1>
                        <div className="flex items-center gap-4 text-gray-600">
                            <p className="text-lg">{product?.brand}</p>
                            <p className="text-sm">SKU: {product?.sku}</p>
                        </div>
                    </div>

                    {/* Precio y acciones */}
                    <div className="py-6 border-b">
                        <div className="flex items-center gap-4 mb-4">
                            <p className="text-3xl font-bold text-gray-900">
                                ${product?.price}
                            </p>
                            {product?.discountPercentage && (
                                <span className="px-2 py-1 text-sm text-white bg-green-500 rounded-full">
                                    {product.discountPercentage}% OFF
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <ProductRatingStar
                                rate={product.rating ?? 0}
                            ></ProductRatingStar>
                            {product.reviews && product.reviews.length > 0 && (
                                <a
                                    href="#reviews"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Ver {product.reviews.length} opiniones
                                </a>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <QuantitySelector
                                className="lg:w-8 lg:h-8"
                                value={quantity}
                                onChange={onQuantityChange}
                            />
                            <Button
                                onClick={() =>
                                    onAddToCart(new Item(quantity, product))
                                }
                            >
                                <CirclePlus />
                                <span>Agregar al Carrito</span>
                            </Button>
                        </div>
                    </div>

                    {/* Estado y envío */}
                    <div className="py-6 border-b">
                        <div className="grid grid-cols-2 gap-4">
                            <InfoCard
                                title="Estado"
                                content={product?.availabilityStatus}
                            />
                            <InfoCard
                                title="Stock"
                                content={`${product?.stock} unidades`}
                            />
                            <InfoCard
                                title="Envío"
                                content={product?.shippingInformation}
                            />
                            <InfoCard
                                title="Garantía"
                                content={product?.warrantyInformation}
                            />
                        </div>
                    </div>

                    {/* Descripción y detalles */}
                    <div className="py-6 border-b">
                        <h2 className="mb-4 text-xl font-semibold">
                            Descripción
                        </h2>
                        <p className="text-gray-600">{product?.description}</p>
                    </div>

                    {/* Especificaciones */}
                    <div className="py-6 border-b">
                        <h2 className="mb-4 text-xl font-semibold">
                            Especificaciones
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Peso: </span>
                                    {product?.weight}g
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">
                                        Dimensiones:{" "}
                                    </span>
                                    {product?.dimensions?.width}cm x{" "}
                                    {product?.dimensions?.height}cm x{" "}
                                    {product?.dimensions?.depth}cm
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    {product?.tags && product.tags.length > 0 && (
                        <div className="py-6 border-b">
                            <div className="flex flex-wrap gap-2">
                                {product.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sección de reseñas */}
            {product?.reviews && product.reviews.length > 0 && (
                <div id="reviews" className="p-8 bg-gray-50">
                    <h2 className="mb-6 text-2xl font-semibold">
                        Reseñas de clientes
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {product.reviews.map((review, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white rounded-lg shadow-sm"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {review.reviewerName}
                                        </p>
                                        <ProductRatingStar
                                            rate={review.rating}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {new Date(
                                            review.date
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                                <p className="text-gray-600">
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const InfoCard = ({ title, content }: { title: string; content?: string }) => (
    <div className="p-4 rounded-lg bg-gray-50">
        <p className="text-sm text-gray-600">
            <span className="block mb-1 font-medium">{title}</span>
            {content}
        </p>
    </div>
);
