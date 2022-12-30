import { createStore, applyMiddleware } from "redux";
import allReducers from "../reducers";
import { fetchMiddleware } from "../middleware";

const store = createStore(allReducers, applyMiddleware(fetchMiddleware));

export default store;
