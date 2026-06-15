export type ProductImageDto = {
    productImageId: number;
    imageUrl: string;
    isPrimary: boolean;
};

export type Product = {
    productId: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    brand?: string;
    rating: number;
    isFeatured: boolean;
    createdAt: string;
    categoryId: number;
    categoryName: string;
    productImages: ProductImageDto[];
};

export type PaginatedResponse<T> = {
    items: T[];
    totalCount: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
};
