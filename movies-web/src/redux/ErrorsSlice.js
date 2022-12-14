import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  errorCode: null,
  errorMessage: null,
};

export const errorsSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    resetErrors: () => initialState,
    serverError: (state) => {
      state.errorCode = 500;
      state.errorMessage = 'Server error';
    },
    badRequestError: (state) => {
      state.errorCode = 400;
      state.errorMessage = 'Bad Request';
    },
  },
  extraReducers: {
  },
});

export const { resetErrors, serverError, badRequestError } = errorsSlice.actions;

export default errorsSlice.reducer;
