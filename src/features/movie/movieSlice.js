// features/movies/moviesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch data
export const fetchMovies = createAsyncThunk('fetchmovies', async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/movies`);
  return response.data.movies;
});
export const fetchMoviesBySearch = createAsyncThunk('search', async (searchQuery) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/recommend/${searchQuery}`);
//   console.log(response.data.movies);
  return response.data.movies;
});
export const fetchMoviesByGenres = createAsyncThunk('search/genres', async (genre) => {
  const payload={
    genres:genre
  }
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/recommend/genres`,payload);
//   console.log(response.data.movies);
  return response.data.movies;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    isLoading: false,
    data: null,
    error: null,
  },
  // reducers: {},

  extraReducers: (builder) => {
      builder.addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      builder.addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.data = action.payload;
      })
      builder.addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
      builder.addCase(fetchMoviesBySearch.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      builder.addCase(fetchMoviesBySearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      builder.addCase(fetchMoviesBySearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
      builder.addCase(fetchMoviesByGenres.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      builder.addCase(fetchMoviesByGenres.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      builder.addCase(fetchMoviesByGenres.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
