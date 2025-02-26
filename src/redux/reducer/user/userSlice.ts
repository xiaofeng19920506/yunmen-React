import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

interface userState {
  email: string;
  name: string;
  event: Event[];
  id: string;
  location: string;
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
  location: "/",
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
    updateEvent: (state, action: PayloadAction<Event>) => {
      state.event = state.event.map((event) =>
        event._id === action.payload._id ? action.payload : event
      );
    },
    updateLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    logoutUser: (state) => {
      return { ...initialState, location: state.location };
    },
  },
});

export const {
  updateUser,
  logoutUser,
  addEvent,
  getAllEvents,
  updateEvent,
  updateLocation,
} = userSlice.actions;
export const user = (state: RootState) => state.user.email;
export default userSlice.reducer;
