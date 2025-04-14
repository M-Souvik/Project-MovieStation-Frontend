import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

export const login = createAsyncThunk('login', async (payload) => {
  const toastId = toast.loading('Logging in...');
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login/`, payload);
    
    if (response.status === 200) {
      console.log('login', response);
      toast.success('Logged in successfully!', { id: toastId });

      const userData = {
        user: response.data.user,
        token: {
          access: response.data.access,
          refresh: response.data.refresh
        }
      };
      localStorage.setItem('userData', JSON.stringify(userData));
    }

    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.error || 'Login failed', { id: toastId });
    throw error;
  }
});
export const register = createAsyncThunk('register', async (payload) => {
  const toastId = toast.loading('Register in progress...');
  try {
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/register/`, payload);
    console.log(response);
    if(response.status==201){
      toast.success('Registration successful!', { id: toastId });

    }
    return response;
  } catch (error) {
    console.log(error)
    toast.error(`${error.response.data.error}` || 'Registration failed', { id: toastId });
    // toast.error()
  }
  });
export const postUserPreferences = createAsyncThunk('prefernces', async (payload) => {
  const toastId = toast.loading('Adding your preference...');

  try {
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/preference/`, payload);
    console.log(response);
    if(response.status==201){
      toast.success('Preference added successfully!',{id:toastId})

    }
    return response;
  } catch (error) {
    console.log(error)
    toast.error(`${error.response.data.error}` || 'Preference adding failed', { id: toastId });
    
  }
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