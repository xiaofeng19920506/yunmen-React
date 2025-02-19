import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

interface userState {
  email: string;
  name: string;
  token: string;
  event: Event[];
}

export type Event = {
  event: string;
};
const initialState: userState = {
  email: "",
  name: "",
  token: "1",
  event: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<userState>) => {
      const keepedToken = state.token;
      state = {
        ...action.payload,
        token: keepedToken,
      };
    },
    updateEvent: (state, action: PayloadAction<Event[]>) => {
      state.event = action.payload;
    },
    logoutUser: (state) => {
      state.token = "";
    },
  },
});

export const { updateUser, logoutUser, updateEvent } = userSlice.actions;
export const user = (state: RootState) => state.user.email;
export default userSlice.reducer;
