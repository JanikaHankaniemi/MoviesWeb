import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scrollUp: false,
};

export const UIControlSlice = createSlice({
  name: 'UIstate',
  initialState,
  reducers: {
    setScrollUp: (state, { payload }) => {
      state.scrollUp = payload;
    },
  },
  extraReducers: {
  },
});

export const {
  setScrollUp
} = UIControlSlice.actions;

export default UIControlSlice.reducer;
