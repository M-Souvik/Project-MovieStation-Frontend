import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('login', async (payload) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login/`, payload);
    return response;
  });
export const register = createAsyncThunk('register', async (payload) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register/`, payload);
    console.log(response);
    return response;
  });

  const loginSlice = createSlice({
    name: 'login',
    initialState: {
      isLoading: false,
      data: null,
      error: null,
    },
    // reducers: {},
  
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        builder.addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          console.log(action.payload);
          state.data = action.payload;
        })
        builder.addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
        
    },
  });
  
  export default loginSlice.reducer;