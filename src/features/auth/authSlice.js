import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

export const login = createAsyncThunk('login', async (payload) => {
  try {
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login/`, payload);
    if(response.status==200){
      toast.success('Logged in successfully!')

    }
    return response;
  } catch (error) {
    console.log(error)
    toast.error(`${error.response.data.error}`)
    
  }
  });
export const register = createAsyncThunk('register', async (payload) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register/`, payload);
    console.log(response);
    return response;
  });
export const postUserPreferences = createAsyncThunk('prefernces', async (payload) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/preference/`, payload);
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
    reducers: {


      clearData: (state) => {
        state.isLoading = false;
        state.data = null;
        state.error = null;
      },
    },
  
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
        builder.addCase(register.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        builder.addCase(register.fulfilled, (state, action) => {
          state.isLoading = false;
          console.log(action.payload);
          state.data = action.payload;
        })
        builder.addCase(register.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
        builder.addCase(postUserPreferences.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        builder.addCase(postUserPreferences.fulfilled, (state, action) => {
          state.isLoading = false;
          console.log(action.payload);
          state.data = action.payload;
        })
        builder.addCase(postUserPreferences.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        });
        
    },
  });
  export const { clearData } = loginSlice.actions;
  export default loginSlice.reducer;