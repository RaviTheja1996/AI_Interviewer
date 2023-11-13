import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./authReducer";
import thunk from "redux-thunk";
import { aiReducer } from "./aiReducer";

const rootReducer = combineReducers({
    authReducer,
    aiReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));