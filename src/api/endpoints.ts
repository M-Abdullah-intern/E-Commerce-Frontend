// Auth Endpoints
export const authEndpoints = {
	REGISTER: '/auth/register' ,
	LOGIN: '/auth/login'
};

// Product endpoints 
export const productEndpoints = {
	GET_PRODUCTS: '/products' ,
	ADD_PRODUCT: '/products',
	GET_BY_ID: (id: number ) => `/products/${id}` ,
	UPDATE_PRODUCT: (id: number ) => `/products/${id}` ,
	DELETE_PRODUCT: (id: number ) => `/products/${id}`
};

// Image Upload Endpoints
export const imageEndpoints = {
	UPLOAD: '/upload'
};

// Category Endpoints
export const categoryEndpoints = {
	GET_CATEGORIES: '/category' ,
	ADD_CATEGORY: '/category'
};

// Cart Endpoints
export const cartEndpoints = {
	GET_CART: '/cart' ,
	ADD_ITEM: '/cart/additem' ,
	UPDATE_CART_ITEM: (cartItemId: number) => `/cart/update/${cartItemId}` ,
	REMOVE_CART_ITEM: (cartItemId: number) => `/cart/remove/${cartItemId}`
};

// Order Endpoints
export const orderEndpoints = {
	// For Customers
	PLACE_ORDER: '/orders/place' , 
	GET_USER_ORDERS: '/orders' ,

	// For Admins
	GET_ALL_ORDERS: '/orders/all' , 
	UPDATE_STATUS: (orderId: number) => `/orders/${orderId}/status`
};

// Payment Endpoints
export const paymentEndpoints = {
	PAYMENT: '/payment'
};

// Invoice Endpoints
export const invoiceEndpoints = {
	GENERATE_INVOICE: (orderId: number) => `/invoice/${orderId}`
}
