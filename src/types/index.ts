export interface IProduct {
    id: string;
    brand: string;
    category: string;
    desc: string;
    imageURL: string;
    name: string;
    price: number;
}

export interface ICartItem {
    id: string;
    brand: string;
    category: string;
    desc: string;
    imageURL: string;
    name: string;
    price: number;
    cartQuantity: number;
}

export interface IShippingAddress {
    city: string;
    line: string;
    name: string;
    postalCode: string;
}

export interface IOrder {
    id: string;
    cartItems: ICartItem[];
    orderAmount: number;
    orderDate: string;
    orderStatus: string;
    orderTime: string;
    userEmail: string;
    userID: string;
    shippingAddress: IShippingAddress; 
    createdAt: {
        seconds: number;
        nanoseconds: number;
    }
}