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
  eventTitle: string;
  eventContent: string[];
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
    addEvent: (state, action: PayloadAction<Event>) => {
      state.event = [...state.event, action.payload];
    },
    logoutUser: (_state) => {
      return initialState;
    },
  },
});

export const { updateUser, logoutUser, addEvent } = userSlice.actions;
export const user = (state: RootState) => state.user.email;
export default userSlice.reducer;
