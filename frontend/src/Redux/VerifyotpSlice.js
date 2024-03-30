import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const verifyotp = createAsyncThunk(
  'verifyotp/verifyotp',
  async ({Email="",OTP=""}) => {
    try {
       console.log("hello")
       const response = await fetch("http://localhost:3000/api/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Email,OTP}) 
      });
      const data = await response.json();
      console.log(data)
      return data.success;
     
    } catch (error) {
      throw Error('Failed to fetch products');
    }
  }
);


const initialState = {
  success: false,
  loading: false,
  error: null,
};

export const verifyotpSlice = createSlice({
  name: 'verifyotp',
  initialState,
  reducers: {
    // Reducers for other actions if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyotp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyotp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
    
      })
      .addCase(verifyotp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default verifyotpSlice.reducer;
