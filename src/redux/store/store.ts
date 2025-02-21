import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/user/userSlice";
import modalReducer from "../reducer/eventModal/eventModalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
