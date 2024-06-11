import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.util";
// Define the context value type
interface UserContextType {
  currentUser: any; // You can replace `any` with a more specific type if you have one
  setCurrentUser: Dispatch<SetStateAction<any>>; // Update `any` to match the type of `currentUser`
}

// Provide a proper initial value with undefined for setCurrentUser
const initialContextValue: UserContextType = {
  currentUser: null,
  setCurrentUser: () => {}, // Temporary placeholder
};

// Create the context with the defined type
export const UserContext = createContext<UserContextType>(initialContextValue);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null); // Update `any` to match the actual type

  const value = {
    currentUser,
    setCurrentUser,
  };

  useEffect(() => {
    const unsubscire = onAuthStateChangedListener((user: any) => {
      console.log("check obserber -> ", user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscire;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
