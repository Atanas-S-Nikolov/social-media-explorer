import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Youtube"
};

export const platformSlice = createSlice({
  name: "platform",
  initialState,
  reducers: {
    updatePlatformReducer: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    resetPlatformReducer: (state) => {
      state.name = initialState.name;
    }
  }
})

export const { updatePlatformReducer, resetPlatformReducer } = platformSlice.actions;
export default platformSlice.reducer;
