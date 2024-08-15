import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const apiKey =import.meta.env.VITE_APP_URL
export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    try {
      const response = await fetch(
        `https://ecom-site-backend.vercel.app/api/getcategory`
      );
      const data = await response.json();
      return data.category;
    } catch (error) {
      throw Error("Failed to fetch category");
    }
  }
);

const initialState = {
  category: [],
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // Reducers for other actions if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default categorySlice.reducer;
