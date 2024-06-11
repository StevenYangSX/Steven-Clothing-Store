import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import CartItem from "../components/cart-item/CartItem.component";

// Define the context value type
interface CartContextType {
  isCartOpen: boolean; // You can replace `any` with a more specific type if you have one
  cartItems: Array<any>;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>; // Update `any` to match the type of `currentUser`
  addItemToCart: Function;
  removeItemFromCart: Function;
  clearItemFromCart: Function;
  cartCount: number;
  cartTotal: number;
}

// Provide a proper initial value with undefined for setCurrentUser
const initialContextValue: CartContextType = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  setIsCartOpen: () => {}, // Temporary placeholder
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
};

const addCartItem = (cartItems: any, productToAdd: any) => {
  const existingCartItem = cartItems.find((cartItem: any) => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem: any) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: any, cartItemToRemove: any) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find((cartItem: any) => cartItem.id === cartItemToRemove.id);

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem: any) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem: any) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems: any, cartItemToClear: any) =>
  cartItems.filter((cartItem: any) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext(initialContextValue);

export const CartProvider = ({ children }: { children: any }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem: any) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem: any) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (product: any) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const removeItemFromCart = (cartItemToRemove: any) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear: any) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
