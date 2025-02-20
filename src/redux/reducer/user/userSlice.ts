import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

interface userState {
  email: string;
  name: string;
  event: Event[];
  id: string;
}

export type Event = {
  event: string;
};
const initialState: userState = {
  email: "",
  name: "",
  event: [],
  id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (_state, action: PayloadAction<userState>) => {
      return action.payload;
    },
    updateEvent: (state, action: PayloadAction<Event[]>) => {
      state.event = action.payload;
    },
    logoutUser: (_state) => {
      return initialState;
    },
  },
});

export const { updateUser, logoutUser, updateEvent } = userSlice.actions;
export const user = (state: RootState) => state.user.email;
export default userSlice.reducer;
