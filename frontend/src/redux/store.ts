import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/authReducer";
import {interviewReducer} from "./Interviews/interviewReducer"
import thunk from "redux-thunk";
import { aiReducer } from "./aiReducer";

const rootReducer = combineReducers({
    authReducer,
    aiReducer,
    interviewReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));