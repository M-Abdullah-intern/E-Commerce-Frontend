import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useCart } from "../../cart/hooks/useCart";
import { useAddress } from "../../addresses/hooks/useAddress";
import { useCreateAddress } from "../../addresses/hooks/useCreateAddress";
import { usePlaceOrder } from "../../orders/hooks/usePlaceOrder";
import { useProcessPayment } from "../../orders/hooks/useProcessPayment";
import { getUserOrders } from "../../orders/api/orderApi";
import AddressList from "../../addresses/components/AddressList";
import AddressForm from "../../addresses/components/AddressForm";
import OrderSummary from "../../cart/components/OrderSummary";
import type { CreateAddressData } from "../../addresses/types/CreateAddressData";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: cart, isLoading: cartLoading, isError: cartError } = useCart();
    const { data: addresses, isLoading: addrLoading } = useAddress();
    const createAddress = useCreateAddress();
    const placeOrder = usePlaceOrder();
    const processPayment = useProcessPayment();

    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        if (cart && cart.items.length === 0) {
            navigate("/cart");
        }
    }, [cart, navigate]);

    const handlePlaceOrder = () => {
        if (selectedAddressId === null) return;

        setErrorMessage(null);

        placeOrder.mutate(
            { shippingAddressId: selectedAddressId },
            {
                onSuccess: async () => {
                    setOrderPlaced(true);

                    const orders = await queryClient.fetchQuery({
                        queryKey: ["orders"],
                        queryFn: getUserOrders,
                    });

                    if (!orders || orders.length === 0) {
                        setErrorMessage(
                            "Order was placed but could not retrieve details."
                        );
                        return;
                    }

                    const latestOrder = orders[0];

                    processPayment.mutate(
                        { orderId: latestOrder.orderId, paymentStatus: "Paid" },
                        {
                            onSuccess: () => {
                                navigate("/order-confirmation", {
                                    state: { order: latestOrder },
                                });
                            },
                            onError: () => {
                                setErrorMessage(
                                    `Order #${latestOrder.orderId} placed but payment failed. Please contact support.`
                                );
                            },
                        }
                    );
                },
                onError: () => {
                    setErrorMessage("Failed to place order. Please try again.");
                },
            }
        );
    };

    if (cartLoading || addrLoading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-8" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="h-40 bg-gray-200 rounded-xl animate-pulse" />
                        <div className="h-40 bg-gray-200 rounded-xl animate-pulse" />
                    </div>
                    <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
                </div>
            </div>
        );
    }

    if (cartError) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-6 text-center">
                    <p className="font-medium">Something went wrong</p>
                    <p className="text-sm mt-1">
                        Could not load your checkout. Please try again.
                    </p>
                </div>
            </div>
        );
    }

    const items = cart?.items ?? [];
    const totalPrice = cart?.totalPrice ?? 0;
    const totalItems = cart?.totalItems ?? 0;

    const isSubmitting = placeOrder.isPending || processPayment.isPending;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {!showForm && addresses && addresses.length > 0 ? (
                        <AddressList
                            addresses={addresses}
                            selectedId={selectedAddressId}
                            onSelect={(id) => setSelectedAddressId(id)}
                            onAddNew={() => setShowForm(true)}
                        />
                    ) : (
                        <AddressForm
                            onSubmit={(data: CreateAddressData) => {
                                createAddress.mutate(data, {
                                    onSuccess: (newAddress) => {
                                        setSelectedAddressId(
                                            newAddress.shippingAddressId
                                        );
                                        setShowForm(false);
                                    },
                                });
                            }}
                            isPending={createAddress.isPending}
                        />
                    )}
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-8 space-y-4">
                        <OrderSummary
                            items={items}
                            totalPrice={totalPrice}
                            totalItems={totalItems}
                            showItems
                        />

                        {errorMessage && (
                            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            onClick={handlePlaceOrder}
                            disabled={
                                selectedAddressId === null ||
                                isSubmitting ||
                                orderPlaced
                            }
                            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {placeOrder.isPending
                                ? "Placing order..."
                                : processPayment.isPending
                                ? "Processing payment..."
                                : "Place Order"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
