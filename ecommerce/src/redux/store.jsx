// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./slices/ productSlice";
import filterReducer from "./slices/filterReducer";
import relatedReducer from "./slices/relatedProduct";
import cartReducer from "./slices/cartSlice";
import localStorageMiddleware from './middleware/localStorageMiddleware';

const rootReducer = combineReducers({
  products: productReducer,
  filter: filterReducer,
  dataRelated: relatedReducer,
  cart: cartReducer,
});
const preloadedState = {
  cart: {
    items: JSON.parse(localStorage.getItem("cartItems")) || [], // Initialize cart with data from local storage
  },
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
});

export default store;
