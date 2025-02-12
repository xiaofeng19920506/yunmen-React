import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

interface userState {
  email: string;
}
const initialState: userState = {
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.email = "";
    },
    incrementByAmount: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { increment, incrementByAmount } = userSlice.actions;
export const user = (state: RootState) => state.user.email;
export default userSlice.reducer;
