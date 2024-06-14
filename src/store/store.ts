import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const middleWares = process.env.NODE_ENV !== "production" ? [logger] : [];

let composedEnhancers = compose(applyMiddleware(...middleWares));

const persistendReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistendReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
