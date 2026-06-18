import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useProducts } from "../hooks/useProducts";
import { useAuthStore } from "../../auth/store/authStore";
import { useAddToCart } from "../../cart/hooks/useCart";
import ProductCard from "../components/ProductCard";
import { FiShoppingCart, FiAlertCircle, FiArrowLeft } from "react-icons/fi";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const addToCart = useAddToCart();

    const {
        data: product,
        isLoading,
        isError,
    } = useProduct(Number(id));

    const images = product?.productImages ?? [];
    const currentImageIndex = selectedImageIndex;

    const { data: relatedData } = useProducts(
        product ? { categoryId: product.categoryId, pageSize: 5 } : undefined
    );

    const relatedProducts = (relatedData?.items ?? [])
        .filter((p) => p.productId !== product?.productId)
        .slice(0, 4);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="max-w-5xl mx-auto px-4 py-8 w-full">
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
                        <div className="flex flex-col gap-4">
                            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4"></div>
                            <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4"></div>
                            <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">
                    <FiAlertCircle className="mx-auto text-red-400 text-5xl mb-4" />
                    <p className="text-lg font-semibold text-red-700 mb-1">Product not found</p>
                    <p className="text-sm text-red-500 mb-6">
                        This product may have been removed or doesn't exist.
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-1 text-sm font-medium text-red-700 hover:text-red-600 underline underline-offset-2 transition-colors"
                    >
                        <FiArrowLeft /> Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!isAuthenticated) return;
        addToCart.mutate({ productId: product.productId, quantity });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/products">Products</Link>
                <span>/</span>
                <Link to={`/products/${product.productId}`} className="text-gray-900 font-medium">
                    {product.name}
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    {images.length > 0 ? (
                        <>
                            <div className="h-80 min-h-[300px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                                <img
                                    src={images[currentImageIndex].imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            {images.length > 1 && (
                                <div className="flex gap-2 mt-3">
                                    {images.map((img, index) => (
                                        <button
                                            key={img.productImageId}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`w-16 h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-colors ${index === currentImageIndex
                                                    ? "border-black"
                                                    : "border-gray-200 hover:border-gray-400"
                                                }`}
                                        >
                                            <img
                                                src={img.imageUrl}
                                                alt={`${product.name} ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="h-80 min-h-[300px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center">
                            <div className="text-gray-300 text-8xl font-light">
                                {product.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    )}
                </div>

                <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide">
                        {product.brand || product.categoryName || "Product"}
                    </p>
                    <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
                    <p className="text-3xl font-bold text-gray-900 mt-4">${product.price}</p>

                    <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>

                    <div className="flex flex-wrap gap-6 mt-8">
                        {product.categoryName && (
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Category</p>
                                <p className="text-sm font-medium text-gray-900 mt-0.5">{product.categoryName}</p>
                            </div>
                        )}
                        {product.brand && (
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Brand</p>
                                <p className="text-sm font-medium text-gray-900 mt-0.5">{product.brand}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Stock</p>
                            <p className={`text-sm font-medium mt-0.5 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                                {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                            </p>
                        </div>
                    </div>

                    {product.stock > 0 && (
                        <div className="flex items-center gap-3 mt-8">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                disabled={quantity <= 1}
                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg"
                            >
                                -
                            </button>
                            <span className="w-10 text-center font-medium text-lg">{quantity}</span>
                            <button
                                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                                disabled={quantity >= product.stock}
                                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg"
                            >
                                +
                            </button>
                        </div>
                    )}

                    {isAuthenticated ? (
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0 || addToCart.isPending}
                            className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FiShoppingCart />
                            {addToCart.isPending ? "Adding..." : addToCart.isSuccess ? "Added!" : "Add to Cart"}
                        </button>
                    ) : (
                        <div className="mt-4">
                            <button
                                disabled
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                            >
                                <FiShoppingCart /> Login to Add to Cart
                            </button>
                            <p className="text-sm text-gray-400 mt-2">
                                Please <Link to="/login" className="text-black underline">log in</Link> to add items to your cart
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {product.categoryName && relatedProducts.length > 0 && (
                <div className="mt-16">
                    <div className="border-t border-gray-200 mb-8"></div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((p) => (
                            <ProductCard key={p.productId} product={p} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
