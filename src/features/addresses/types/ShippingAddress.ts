export interface ShippingAddress {
    shippingAddressId: number;
    fullName: string;
    phoneNumber: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
}