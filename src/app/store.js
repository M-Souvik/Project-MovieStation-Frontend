import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../features/movie/movieSlice'
import authReducer from '../features/auth/authSlice'

export default configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer
  }
})