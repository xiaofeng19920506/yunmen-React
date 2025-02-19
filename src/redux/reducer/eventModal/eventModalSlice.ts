import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

interface modalState {
  open: boolean;
}

const initialState: modalState = {
  open: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updateModalState: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { updateModalState } = modalSlice.actions;
export const modalState = (state: RootState) => state.modal.open;
export default modalSlice.reducer;
