import { useParams, Link } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";

export default function ProductDetailsPage() {
    const { id } = useParams();

    const {
        data: product,
        isLoading,
        isError,
    } = useProduct(Number(id));

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-gray-500 text-lg">Loading...</div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                    <p className="text-gray-500 text-lg">Product not found</p>
                    <Link to="/products" className="text-sm text-black hover:underline mt-2 inline-block">Back to products</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <Link
                to="/products"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors mb-6"
            >
                <FiArrowLeft /> Back to Products
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="h-80 md:h-full min-h-[300px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center">
                    <div className="text-gray-300 text-8xl font-light">
                        {product.name.charAt(0).toUpperCase()}
                    </div>
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
                        {product.stock !== undefined && (
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Stock</p>
                                <p className={`text-sm font-medium mt-0.5 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                                    {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        disabled={product.stock !== undefined && product.stock <= 0}
                        className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FiShoppingCart /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
