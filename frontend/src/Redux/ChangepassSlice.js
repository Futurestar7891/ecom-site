import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const changepassword = createAsyncThunk(
  'changepassword/changepassword',
  async ({Email="",Password=""}) => {
    try {
       console.log("hello")
       const response = await fetch("http://localhost:3000/api/newpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Email,Password}) 
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

export const changepassSlice = createSlice({
  name: 'changepassword',
  initialState,
  reducers: {
    // Reducers for other actions if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(changepassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changepassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
    
      })
      .addCase(changepassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default changepassSlice.reducer;
