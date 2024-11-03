import sessionStorage from "redux-persist/lib/storage"

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { accountReducer } from "./states";

// config 작성
const persistConfig = {
  key: "root", // localStorage key 
  storage, // localStorage
}

export const rootReducer = combineReducers({
  account: accountReducer
});

// persistReducer로 감싸기
export default persistReducer(persistConfig, rootReducer);