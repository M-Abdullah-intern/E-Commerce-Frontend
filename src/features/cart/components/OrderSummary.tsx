import type { CartItem } from "../types/cart";

interface OrderSummaryProps {
    items: CartItem[];
    totalPrice: number;
    totalItems: number;
    showItems?: boolean;
    shippingLabel?: string;
}

export default function OrderSummary({
    items,
    totalPrice,
    totalItems,
    showItems = false,
    shippingLabel = "Free",
}: OrderSummaryProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

            {showItems && items.length > 0 && (
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                    {items.map((item) => (
                        <div key={item.cartItemId} className="flex justify-between text-sm">
                            <span className="text-gray-600 flex-1 truncate">
                                {item.productName}{" "}
                                <span className="text-gray-400">×{item.quantity}</span>
                            </span>
                            <span className="font-medium text-gray-900 ml-4 shrink-0">
                                ${(item.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>
                        Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})
                    </span>
                    <span className="font-medium text-gray-900">
                        ${totalPrice.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-gray-400">{shippingLabel}</span>
                </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between text-base">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">
                        ${totalPrice.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}
