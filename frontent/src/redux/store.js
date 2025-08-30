import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/Slices/authSlice";
import settingsReducer from "../redux/Slices/settingsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
  },
});

export default store;
