import { createContext, useReducer } from "react";
import { CartStateType } from "../types/systemTypes";
import { createAction } from "../utils/reducer/reducer.util";
// Define the context value type
interface CartContextType {
  isCartOpen: boolean; // You can replace `any` with a more specific type if you have one
  cartItems: Array<any>;
  setIsCartOpen: Function; // Update `any` to match the type of `currentUser`
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

/*
reducer code starts here
*/

const INITIAL_STATE: CartStateType = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      new Error(`Unhandled type of ${type} in cartReducer.`);
  }
};

export const CartProvider = ({ children }: { children: any }) => {
  const [{ cartItems, cartTotal, cartCount, isCartOpen }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );
  /**
   *
   * @param product
   */
  const updateCartItemsReducer = (newCartItems: any) => {
    const newCartCount = newCartItems.reduce(
      (total: number, cartItem: any) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total: number, cartItem: any) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (product: any) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove: any) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear: any) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (cartOpenStatus: boolean) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, {
        cartOpenStatus,
      })
    );
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
