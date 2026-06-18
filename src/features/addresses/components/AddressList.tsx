import { FiPlus } from "react-icons/fi";
import type { ShippingAddress } from "../types/ShippingAddress";

interface AddressListProps {
    addresses: ShippingAddress[];
    selectedId: number | null;
    onSelect: (id: number) => void;
    onAddNew: () => void;
}

export default function AddressList({
    addresses,
    selectedId,
    onSelect,
    onAddNew,
}: AddressListProps) {
    if (addresses.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>No saved addresses yet.</p>
                <p className="text-sm mt-1">Add one below to continue.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
                Shipping Address
            </h3>

            {addresses.map((address) => (
                <label
                    key={address.shippingAddressId}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                        selectedId === address.shippingAddressId
                            ? "border-black ring-2 ring-black"
                            : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                    <input
                        type="radio"
                        name="shippingAddress"
                        checked={selectedId === address.shippingAddressId}
                        onChange={() => onSelect(address.shippingAddressId)}
                        className="mt-1 accent-black"
                    />

                    <div className="flex-1 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                                {address.fullName}
                            </span>
                            {address.isDefault && (
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                    Default
                                </span>
                            )}
                        </div>
                        <p className="text-gray-600 mt-0.5">
                            {address.streetAddress}
                        </p>
                        <p className="text-gray-600">
                            {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-gray-500 mt-0.5">
                            {address.phoneNumber}
                        </p>
                    </div>
                </label>
            ))}

            <button
                onClick={onAddNew}
                className="w-full mt-2 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors font-medium text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
                <FiPlus />
                Add New Address
            </button>
        </div>
    );
}
