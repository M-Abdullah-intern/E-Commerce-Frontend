import type { OrderItems } from './OrderItems';

export interface Order {
    orderId: number;
    totalAmount: number;
    status: string;
    items: OrderItems[];
    shippingFullName: string;
    shippingPhoneNumber: string;
    shippingStreetAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingZipCode: string;
    shippingCountry: string;
}

export interface PlaceOrderData {
    shippingAddressId: number;
}

export interface PaymentData {
    orderId: number;
    paymentStatus: string;
}