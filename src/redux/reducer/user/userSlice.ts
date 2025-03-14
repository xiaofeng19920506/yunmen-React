import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

interface userState {
  email: string;
  name: string;
  event: Event[];
  id: string;
  popMessage: string;
  show: boolean;
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
  popMessage: "",
  show: false,
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
    logoutUser: (_state) => {
      return initialState;
    },
    updateMessage: (state, action: PayloadAction<string>) => {
      state.popMessage = action.payload;
    },
    showPopUp: (state, action: PayloadAction<boolean>) => {
      state.show = action.payload;
    },
  },
});

export const {
  updateUser,
  logoutUser,
  addEvent,
  getAllEvents,
  updateEvent,
  updateMessage,
  showPopUp,
} = userSlice.actions;
export const user = (state: RootState) => state.user.email;
export default userSlice.reducer;
