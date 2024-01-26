import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import userReducer from "./userSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: { todo: todoReducer, user: userReducer, auth: authSlice },
});

export default store;
