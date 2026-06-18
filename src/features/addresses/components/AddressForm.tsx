import { useState } from "react";
import type { CreateAddressData } from "../types/CreateAddressData";

interface AddressFormProps {
    onSubmit: (data: CreateAddressData) => void;
    isPending: boolean;
}

interface FieldErrors {
    fullName?: string;
    phoneNumber?: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}

export default function AddressForm({ onSubmit, isPending }: AddressFormProps) {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");
    const [isDefault, setIsDefault] = useState(false);

    const [errors, setErrors] = useState<FieldErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validate = (): boolean => {
        const newErrors: FieldErrors = {};

        if (!fullName.trim()) newErrors.fullName = "Full name is required";
        if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
        else if (phoneNumber.replace(/\D/g, "").length < 10)
            newErrors.phoneNumber = "Enter a valid phone number (at least 10 digits)";
        if (!streetAddress.trim()) newErrors.streetAddress = "Street address is required";
        if (!city.trim()) newErrors.city = "City is required";
        if (!state.trim()) newErrors.state = "State is required";
        if (!zipCode.trim()) newErrors.zipCode = "Zip code is required";
        else if (zipCode.trim().length < 5)
            newErrors.zipCode = "Zip code must be at least 5 characters";
        if (!country.trim()) newErrors.country = "Country is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (field: keyof FieldErrors) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        validate();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({
            fullName: true,
            phoneNumber: true,
            streetAddress: true,
            city: true,
            state: true,
            zipCode: true,
            country: true,
        });

        if (!validate()) return;

        onSubmit({
            fullName: fullName.trim(),
            phoneNumber: phoneNumber.trim(),
            streetAddress: streetAddress.trim(),
            city: city.trim(),
            state: state.trim(),
            zipCode: zipCode.trim(),
            country: country.trim(),
            isDefault,
        });
    };

    const inputClass = (field: keyof FieldErrors) =>
        `mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:text-gray-400 ${
            touched[field] && errors[field]
                ? "border-red-300 focus:ring-red-500"
                : "border-gray-300"
        }`;

    const errorText = (field: keyof FieldErrors) => {
        if (touched[field] && errors[field]) {
            return <p className="text-red-500 text-xs mt-1">{errors[field]}</p>;
        }
        return null;
    };

    return (
        <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
                Add New Address
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Full Name
                    </label>
                    <input
                        className={inputClass("fullName")}
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={() => handleBlur("fullName")}
                    />
                    {errorText("fullName")}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input
                        className={inputClass("phoneNumber")}
                        placeholder="(555) 123-4567"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onBlur={() => handleBlur("phoneNumber")}
                    />
                    {errorText("phoneNumber")}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Street Address
                    </label>
                    <input
                        className={inputClass("streetAddress")}
                        placeholder="123 Main St"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        onBlur={() => handleBlur("streetAddress")}
                    />
                    {errorText("streetAddress")}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input
                            className={inputClass("city")}
                            placeholder="Springfield"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onBlur={() => handleBlur("city")}
                        />
                        {errorText("city")}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            State
                        </label>
                        <input
                            className={inputClass("state")}
                            placeholder="IL"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            onBlur={() => handleBlur("state")}
                        />
                        {errorText("state")}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Zip Code
                        </label>
                        <input
                            className={inputClass("zipCode")}
                            placeholder="62701"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            onBlur={() => handleBlur("zipCode")}
                        />
                        {errorText("zipCode")}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <input
                            className={inputClass("country")}
                            placeholder="United States"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            onBlur={() => handleBlur("country")}
                        />
                        {errorText("country")}
                    </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isDefault}
                        onChange={(e) => setIsDefault(e.target.checked)}
                        className="accent-black"
                    />
                    <span className="text-sm text-gray-700">
                        Set as default address
                    </span>
                </label>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "Saving..." : "Save Address"}
                </button>
            </form>
        </div>
    );
}
