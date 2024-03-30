import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchotp = createAsyncThunk(
  'forgotpass/fetchotp',
  async ({Email=""}) => {
    try {
       console.log("enterd in forgotpass app")
       const response = await fetch("http://localhost:3000/api/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( {Email} ) 
      });
      const data = await response.json();
      console.log(data);
      return data.Email;
    } catch (error) {
      throw Error('Failed to fetch products');
    }
  }
);


const initialState = {
  Email: "",
  loading: false,
  error: null,
};

export const forgotSlice = createSlice({
  name: 'forgotpass',
  initialState,
  reducers: {
    // Reducers for other actions if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchotp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchotp.fulfilled, (state, action) => {
        state.loading = false;
        state.Email = action.payload;
    
      })
      .addCase(fetchotp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default forgotSlice.reducer;
