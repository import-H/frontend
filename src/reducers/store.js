// redux-toolkit
import { useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

// slices
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";

//https://edvins.io/how-to-use-redux-persist-with-redux-toolkit 참고

// redux-persist
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

// reducers
const reducers = combineReducers({
  auth: authReducer, // authSlice
  post: postReducer // postSlice
});

const rootReducer = (state, action) => {
  //console.log(action.type);
  if (action.type === "auth/logoutSuccess") {
    state = undefined;
  }
  return reducers(state, action);
};

// localStorage root에 redux 저장
const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// store 생성
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk]
});

// redux-persist 가이드: https://edvins.io/how-to-use-redux-persist-with-redux-toolkit 참고
