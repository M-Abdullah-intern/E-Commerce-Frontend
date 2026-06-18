import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetUserOrders } from "../hooks/useGetUserOrders";
import type { Order } from "../types/order";
import { FiPackage, FiChevronDown, FiChevronUp, FiArrowLeft } from "react-icons/fi";

export default function OrderHistoryPage() {
    const { data: orders, isLoading, isError } = useGetUserOrders();
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

    const toggleExpand = (orderId: number) => {
        setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
                        <div className="space-y-3">
                            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-6 text-center">
                    <p className="font-medium">Something went wrong</p>
                    <p className="text-sm mt-1">Could not load your order history. Please try again.</p>
                </div>
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <FiPackage className="mx-auto text-gray-300 text-7xl mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
                <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Link
                to="/products"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-black transition-colors mb-6"
            >
                <FiArrowLeft /> Continue Shopping
            </Link>

            <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>

            <div className="space-y-4">
                {orders.map((order: Order) => (
                    <div
                        key={order.orderId}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                        <button
                            onClick={() => toggleExpand(order.orderId)}
                            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors text-left"
                        >
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Order</p>
                                    <p className="font-semibold text-gray-900">#{order.orderId}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-0.5 ${
                                        order.status === "Delivered"
                                            ? "bg-green-100 text-green-700"
                                            : order.status === "Shipped"
                                            ? "bg-blue-100 text-blue-700"
                                            : order.status === "Cancelled"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Items</p>
                                    <p className="font-medium text-gray-900">{order.items.length}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
                                    <p className="font-bold text-gray-900">${order.totalAmount.toFixed(2)}</p>
                                </div>
                            </div>
                            {expandedOrderId === order.orderId ? (
                                <FiChevronUp className="text-gray-400 flex-shrink-0 ml-4" size={20} />
                            ) : (
                                <FiChevronDown className="text-gray-400 flex-shrink-0 ml-4" size={20} />
                            )}
                        </button>

                        {expandedOrderId === order.orderId && (
                            <div className="border-t border-gray-200 p-6 bg-gray-50">
                                <h3 className="font-semibold text-gray-900 mb-3">Items</h3>
                                <div className="space-y-2 mb-6">
                                    {order.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-gray-200"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">{item.productName}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-semibold text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                                <div className="text-sm text-gray-600 bg-white rounded-lg px-4 py-3 border border-gray-200">
                                    <p className="font-medium text-gray-900">{order.shippingFullName}</p>
                                    <p>{order.shippingStreetAddress}</p>
                                    <p>{order.shippingCity}, {order.shippingState} {order.shippingZipCode}</p>
                                    <p>{order.shippingCountry}</p>
                                    <p>{order.shippingPhoneNumber}</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
