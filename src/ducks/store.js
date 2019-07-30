import {createStore, applyMiddleware, combineReducers} from "redux";
import promise  from "redux-promise-middleware";
import authReducer from "./authReducer"

const rootReducer = combineReducers ({
    auth : authReducer
})

export default createStore(rootReducer, applyMiddleware(promise));