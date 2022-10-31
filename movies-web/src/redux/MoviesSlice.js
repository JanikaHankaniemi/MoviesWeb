import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/AxiosSetup';

export const getMovies = createAsyncThunk('movies/getMovies', async () => {
  const response = await axios.get(
    'api/Movies'
  );
  console.log("step 1", response);
  return response.data;
});
export const getGenres = createAsyncThunk('movies/getGenres', async () => {
  console.log("step 1");
  const response = await axios.get(
    'api/Movies/Genres'
  );
  console.log("step 1", response);
  return response.data;
});

export const findMovie = createAsyncThunk('movies/findMovie', async ({ id }) => {
  const response = await axios.get(
    'api/Movies/${id}'
  );
  return response.data;
});

export const searchMovie = createAsyncThunk('movies/searchMovie', async ({ searchTerms }) => {
  const response = await axios.get(
    'api/Movies/Search',
    {
      params: {
        searchTerms
      },
    });
  return response.data;
});

export const addMovie = createAsyncThunk('movies/addMovie', async ({ movie }) => {
  const response = await axios.post(
    `api/Movies`,
    movie,
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
    [searchMovie.pending]: (state) => {
      state.searchingMovies = true;
    },
    [searchMovie.fulfilled]: (state, { payload }) => {
      state.searchResult = payload;
      state.searchingMovies = false;
    },
    [searchMovie.rejected]: (state) => {
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
