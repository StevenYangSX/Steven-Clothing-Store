import React, { createContext, useState } from "react";
import PRODUCTS from "../shopData.json";

// Define the context value type
interface ProductContextType {
  products: Array<any>; // You can replace `any` with a more specific type if you have one
  //setCurrentUser: Dispatch<SetStateAction<any>>; // Update `any` to match the type of `currentUser`
}

// Provide a proper initial value with undefined for setCurrentUser
const initialContextValue: ProductContextType = {
  products: [],
  //setCurrentUser: () => {}, // Temporary placeholder
};

// Create the context with the defined type
// export const UserContext = createContext<UserContextType>(initialContextValue);

export const ProductContext = createContext<ProductContextType>(initialContextValue);

export const ProductProvider = ({ children }: { children: any }) => {
  const [products, setProducts] = useState<any>(PRODUCTS); // Update `any` to match the actual type

  const value = {
    products,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
