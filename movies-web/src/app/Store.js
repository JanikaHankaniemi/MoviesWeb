
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../redux/MoviesSlice';
import UIControlReducer from '../redux/UIControlSlice';
import ErrorReducer from '../redux/ErrorsSlice';

export default configureStore({
  reducer: {
    movies: moviesReducer,
    UIstate: UIControlReducer,
    errors: ErrorReducer,
  },
});
