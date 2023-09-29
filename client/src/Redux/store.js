import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { webReducer } from "./webdetails/reducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  web_details: webReducer,
});

export const store = legacy_createStore(reducer, applyMiddleware(thunk));
