import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, keyword = "",minprice=0,maxprice=50000,brand="",color="",size="",rating=0 }={}) => {
    try {
      const url=`http://localhost:3000/api/getallproduct?page=${page}&keyword=${keyword}&minprice=${minprice}&maxprice=${maxprice}
      &brand=${brand}&color=${color}&size=${size}&rating=${rating}`
      const response = await fetch(url);
      const data = await response.json();
      const { product, totalpages } = data;
      return { product, totalpages };
    } catch (error) {
      throw Error('Failed to fetch products');
    }
  }
);


const initialState = {
  products: [],
  totalpages:"",
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Reducers for other actions if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.product;
        state.totalpages=action.payload.totalpages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default productSlice.reducer;
