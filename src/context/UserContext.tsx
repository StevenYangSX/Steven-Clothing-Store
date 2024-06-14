import { createContext, ReactNode, Dispatch, SetStateAction, useEffect, useReducer } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.util";
import { createAction } from "../utils/reducer/reducer.util";
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

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Action Type ${type} is not existed in UserReducer.`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // const [currentUser, setCurrentUser] = useState<any>(null); // Update `any` to match the actual type

  // use Reducer
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const setCurrentUser = (user: any) => {
    dispatch(
      createAction(USER_ACTION_TYPES.SET_CURRENT_USER, {
        user,
      })
    );
  };
  const { currentUser } = state;

  const value = {
    currentUser,
    setCurrentUser,
  };

  useEffect(() => {
    const unsubscire = onAuthStateChangedListener((user: any) => {
      // console.log("check obserber -> ", user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscire;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
