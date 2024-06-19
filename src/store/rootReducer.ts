import { cartReducer } from "./cart/cartReducer";
import { categoriesReducer } from "./catetories/categoryReducer";
import { paymentReducer } from "./payment/paymentReducer";
import { userReducer } from "./user/userReducer";
import { combineReducers } from "redux";

// combine all small reducers

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  payment: paymentReducer,
});
