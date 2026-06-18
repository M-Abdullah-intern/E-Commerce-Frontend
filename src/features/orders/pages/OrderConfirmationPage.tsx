import { useLocation, Link } from "react-router-dom";
import type { Order } from "../types/order";

export default function OrderConfirmationPage() {
    const location = useLocation();
    const order = location.state?.order as Order | undefined;

    if (!order) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                    <p className="text-gray-500">Order details not found.</p>
                    <Link
                        to="/products"
                        className="text-black underline mt-2 inline-block"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-green-600 text-3xl">&#10003;</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Order Placed Successfully!
            </h1>
            <p className="text-gray-500 mb-8">
                Your order #{order.orderId} has been placed.
            </p>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-left mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">
                    Order Details
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                    <p>
                        <span className="font-medium">Order ID:</span> #
                        {order.orderId}
                    </p>
                    <p>
                        <span className="font-medium">Status:</span>{" "}
                        {order.status}
                    </p>
                    <p>
                        <span className="font-medium">Total:</span> $
                        {order.totalAmount.toFixed(2)}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 text-left mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">
                    Shipping Address
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                    <p>{order.shippingFullName}</p>
                    <p>{order.shippingStreetAddress}</p>
                    <p>
                        {order.shippingCity}, {order.shippingState}{" "}
                        {order.shippingZipCode}
                    </p>
                    <p>{order.shippingCountry}</p>
                    <p>{order.shippingPhoneNumber}</p>
                </div>
            </div>

            <Link
                to="/products"
                className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
                Continue Shopping
            </Link>
        </div>
    );
}
