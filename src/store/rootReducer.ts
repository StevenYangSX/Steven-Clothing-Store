import { categoriesReducer } from "./catetories/categoryReducer";
import { userReducer } from "./user/userReducer";
import { combineReducers } from "redux";

// combine all small reducers

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});
