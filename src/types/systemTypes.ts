export interface Category {
  imageUrl: string;
  title: string;
  id: number;
}

export interface UserAuthType {
  uid: string;
  email: string | null;
  displayName: string;
}

export interface ProductType {
  name: string;
  price: number;
  imageUrl: string;
}



export  interface CartStateType  {
  isCartOpen: boolean,
  cartItems: Array<any>,
  cartCount: number,
  cartTotal: number,
};