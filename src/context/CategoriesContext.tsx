import React, { createContext, useEffect, useState } from "react";
import SHOP_DATA from "../shopData";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.util";
// Define the context value type
interface ProductContextType {
  categoriesMap: object; // You can replace `any` with a more specific type if you have one
  //setCurrentUser: Dispatch<SetStateAction<any>>; // Update `any` to match the type of `currentUser`
}

// Provide a proper initial value with undefined for setCurrentUser
const initialContextValue: ProductContextType = {
  categoriesMap: {},
  //setCurrentUser: () => {}, // Temporary placeholder
};

// Create the context with the defined type
// export const UserContext = createContext<UserContextType>(initialContextValue);

export const CategoriesContext = createContext<ProductContextType>(initialContextValue);

export const CategoriesProvider = ({ children }: { children: any }) => {
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);
  const [categoriesMap, setCategoriesMap] = useState<any>({}); // Update `any` to match the actual type

  const value = {
    categoriesMap,
  };

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
