import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Youtube",
  query: ""
};

export const platformSlice = createSlice({
  name: "platform",
  initialState,
  reducers: {
    updatePlatformNameReducer: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateSearchQueryReducer: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    resetPlatformReducer: (state) => {
      state.name = initialState.name;
      state.query = initialState.query;
    }
  }
})

export const { updatePlatformNameReducer, updateSearchQueryReducer, resetPlatformReducer } = platformSlice.actions;
export default platformSlice.reducer;
