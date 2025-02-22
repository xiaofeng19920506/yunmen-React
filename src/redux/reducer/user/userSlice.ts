import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import { updateEvent } from "../../../utils/Request/userEvent";

interface userState {
  email: string;
  name: string;
  event: Event[];
  id: string;
}

export type Event = {
  _id: string;
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
    getAllEvents: (state, action: PayloadAction<Event[]>) => {
      state.event = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.event = [...state.event, action.payload];
    },
    updateEvent: (state, action: PayloadAction<string>) => {
      console.log(state, action);
    },
    logoutUser: (_state) => {
      return initialState;
    },
  },
});

export const { updateUser, logoutUser, addEvent, getAllEvents } =
  userSlice.actions;
export const user = (state: RootState) => state.user.email;
export default userSlice.reducer;
