import { createAction } from "../../utils/reducer/reducer.util";
import { CART_ACTION_TYPES } from "./cartActionType";

export const setIsCartOpen = (status: boolean) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, status);
};

export const addItemToCart = (cartItems: any, product: any) => {
  const newCartItems = addCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems: any, cartItemToRemove: any) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems: any, cartItemToClear: any) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
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
