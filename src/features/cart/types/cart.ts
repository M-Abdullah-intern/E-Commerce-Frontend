export type CartItem = {
    cartItemId: number;
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    imageUrl?: string;
};

export type Cart = {
    items: CartItem[];
    totalPrice: number;
    totalItems: number;
};
