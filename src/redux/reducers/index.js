import { combineReducers } from "redux";
import BasketReducer from "./basket";
import ProductsReducer from "./products";

export default combineReducers({ BasketReducer, ProductsReducer });
