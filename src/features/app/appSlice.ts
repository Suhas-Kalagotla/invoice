import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  light_mode: LIGHT_MODE;
}

const initialState: AppState = {
  light_mode: "dark",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setLightMoode: (state, action: PayloadAction<LIGHT_MODE>) => {
      state.light_mode = action.payload;
      // localStorage.setItem("light_mode", action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLightMoode } = counterSlice.actions;

export default counterSlice.reducer;
