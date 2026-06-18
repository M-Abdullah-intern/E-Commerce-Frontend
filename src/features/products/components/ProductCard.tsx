import { Link } from "react-router-dom";
import type { Product } from "../types/product";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            to={`/products/${product.productId}`}
            className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 overflow-hidden"
        >
            <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                {product.productImages && product.productImages.length > 0 ? (
                    <img
                        src={product.productImages[0].imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="text-gray-300 text-6xl font-light">
                        {product.name.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>
            <div className="p-5">
                <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors truncate">
                    {product.name}
                </h3>
                <p className="text-lg font-bold text-gray-900 mt-1">
                    ${product.price}
                </p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {product.description}
                </p>
                <p className={`text-xs mt-3 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </p>
            </div>
        </Link>
    );
}
