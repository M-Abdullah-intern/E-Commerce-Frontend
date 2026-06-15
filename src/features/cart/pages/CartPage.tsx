import { Link } from "react-router-dom";
import { useCart, useUpdateCartItem, useRemoveCartItem } from "../hooks/useCart";
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiArrowLeft } from "react-icons/fi";

export default function CartPage() {
    const { data: cart, isLoading, isError } = useCart();
    const updateMutation = useUpdateCartItem();
    const removeMutation = useRemoveCartItem();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-gray-500 text-lg">Loading cart...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-6 text-center">
                    <p className="font-medium">Something went wrong</p>
                    <p className="text-sm mt-1">Could not load your cart. Please try again.</p>
                </div>
            </div>
        );
    }

    const items = cart?.items ?? [];
    const totalPrice = cart?.totalPrice ?? 0;
    const totalItems = cart?.totalItems ?? 0;

    if (items.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <FiShoppingCart className="mx-auto text-gray-300 text-7xl mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <Link
                to="/products"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors mb-6"
            >
                <FiArrowLeft /> Continue Shopping
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Shopping Cart ({totalItems} item{totalItems !== 1 ? "s" : ""})
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item: any) => (
                        <div
                            key={item.cartItemId}
                            className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200"
                        >
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <div className="text-gray-300 text-2xl font-light">
                                    {item.productName?.charAt(0).toUpperCase()}
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <Link
                                    to={`/products/${item.productId}`}
                                    className="font-semibold text-gray-900 hover:text-black transition-colors"
                                >
                                    {item.productName}
                                </Link>
                                <p className="text-sm text-gray-500 mt-0.5">${item.price.toFixed(2)}</p>

                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={() => {
                                                if (item.quantity > 1) {
                                                    updateMutation.mutate({
                                                        cartItemId: item.cartItemId,
                                                        quantity: item.quantity - 1,
                                                    });
                                                }
                                            }}
                                            disabled={item.quantity <= 1}
                                            className="p-2 hover:bg-gray-50 disabled:opacity-30 transition-colors"
                                        >
                                            <FiMinus size={14} />
                                        </button>
                                        <span className="px-4 py-2 text-sm font-medium border-x border-gray-300">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                updateMutation.mutate({
                                                    cartItemId: item.cartItemId,
                                                    quantity: item.quantity + 1,
                                                })
                                            }
                                            className="p-2 hover:bg-gray-50 transition-colors"
                                        >
                                            <FiPlus size={14} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeMutation.mutate(item.cartItemId)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                        title="Remove item"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="text-right flex-shrink-0">
                                <p className="font-semibold text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
                            <span className="font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span className="text-gray-400">Calculated at checkout</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 mt-4 pt-4">
                        <div className="flex justify-between text-base">
                            <span className="font-bold text-gray-900">Total</span>
                            <span className="font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <button className="w-full mt-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
