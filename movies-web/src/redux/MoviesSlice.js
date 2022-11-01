import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/AxiosSetup';

export const getMovies = createAsyncThunk('movies/getMovies', async () => {
  const response = await axios.get(
    'api/Movies'
  );
  return response.data;
});
export const getGenres = createAsyncThunk('movies/getGenres', async () => {
  const response = await axios.get(
    'api/Movies/Genres'
  );
  return response.data;
});

export const findMovie = createAsyncThunk('movies/findMovie', async ({ id }) => {
  const response = await axios.get(
    `api/Movies/${id}`
  );
  return response.data;
});

export const searchMovies = createAsyncThunk('movies/searchMovies', async ({ formData }) => {
  const response = await axios.get(
    'api/Movies/Search',
    {
      params: {
        ...formData
      },
    });
  return response.data;
});

export const addMovie = createAsyncThunk('movies/addMovie', async ({ formData }) => {
  console.log("formData", formData)
  const response = await axios.post(
    `api/Movies`,
    formData,
  );
  return response.data;
});

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    fetchingMovies: false,
    fetchingGenres: false,
    findingMovie: false,
    searchingMovies: false,
    addingMovie: false
  },
  reducers: {
    setSearchFilter: (state, { payload }) => {
      state.searchFilter.freeText = payload.freeText;
      state.searchFilter.year = payload.year;
      state.searchFilter.genre = payload.genre;
      state.searchFilter.rating = payload.rating;
      state.searchFilter.ageLimit = payload.ageLimit;
      state.searchFilter.skip = payload.skip;
      state.searchFilter.nbrOfEntries = payload.nbrOfEntries;
    },
    clearSearchFilter: (state) => {
      state.searchFilter.freeText = '';
      state.searchFilter.year = '';
      state.searchFilter.genre = '';
      state.searchFilter.rating = '';
      state.searchFilter.ageLimit = '';
      state.searchFilter.skip = '';
      state.searchFilter.nbrOfEntries = '';
    },
  },
  extraReducers: {
    [getMovies.pending]: (state) => {
      state.fetchingMovies = true;
    },
    [getMovies.fulfilled]: (state, { payload }) => {
      state.movies = payload;
      state.fetchingMovies = false;
    },
    [getMovies.rejected]: (state) => {
      state.fetchingMovies = false;
    },
    [getGenres.pending]: (state) => {
      state.fetchingGenres = true;
    },
    [getGenres.fulfilled]: (state, { payload }) => {
      state.genres = payload;
      state.fetchingGenres = false;
    },
    [getGenres.rejected]: (state) => {
      state.fetchingGenres = false;
    },
    [findMovie.pending]: (state) => {
      state.findingMovie = true;
    },
    [findMovie.fulfilled]: (state, { payload }) => {
      state.movie = payload;
      state.findingMovie = false;
    },
    [findMovie.rejected]: (state) => {
      state.findingMovie = false;
    },
    [searchMovies.pending]: (state) => {
      state.searchingMovies = true;
    },
    [searchMovies.fulfilled]: (state, { payload }) => {
      state.movies = payload;
      state.searchingMovies = false;
    },
    [searchMovies.rejected]: (state) => {
      state.searchingMovies = false;
    },
    [addMovie.pending]: (state) => {
      state.addingMovie = true;
    },
    [addMovie.fulfilled]: (state, { payload }) => {
      state.addedMovie = payload;
      state.addingMovie = false;
    },
    [addMovie.rejected]: (state) => {
      state.addingMovie = false;
    },
  },
});

export default moviesSlice.reducer;
