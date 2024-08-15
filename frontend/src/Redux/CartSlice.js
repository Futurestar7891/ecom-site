import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const apiKey = import.meta.env.VITE_APP_URL;
export const addToCart = createAsyncThunk(
  "Cartdata/addtocart",
  async ({ Cartdata, Userid }) => {
    try {
      const response = await fetch(
        `https://ecom-site-backend.vercel.app/api/addCartproducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Cartdata: Cartdata,
            Userid: Userid,
          }),
        }
      );
      const data = await response.json();
      console.log(data.message);
      return data.message;
    } catch (error) {
      throw Error("Failed to fetch products");
    }
  }
);

export const deleteToCart = createAsyncThunk(
  "Cartdata/deletetocart",
  async ({ index, Userid }) => {
    try {
      const response = await fetch(
        `https://ecom-site-backend.vercel.app/api/deleteCartproducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            index: index,
            Userid: Userid,
          }),
        }
      );
      const data = await response.json();
      return data.message;
    } catch (error) {
      throw Error("Failed to fetch products");
    }
  }
);

export const getFromCart = createAsyncThunk(
  "Cartdata/getfromcart",
  async ({ Userid }) => {
    try {
      const response = await fetch(
        `https://ecom-site-backend.vercel.app/api/getCartproducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Userid: Userid,
          }),
        }
      );
      const data = await response.json();
      return data.Cartdata;
    } catch (error) {
      throw Error("Failed to fetch products");
    }
  }
);

export const updateToCart = createAsyncThunk(
  "Cartdata/updatetocart",
  async ({ Userid, Index, Quantity }) => {
    try {
      const response = await fetch(
        `https://ecom-site-backend.vercel.app/api/updatecartproducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Userid: Userid,
            Index: Index,
            Quantity: Quantity,
          }),
        }
      );
      const data = await response.json();
      return data.message;
    } catch (error) {
      throw Error("Failed to fetch products");
    }
  }
);

const initialState = {
  Cart: [],
  added: "",
  deleted: "",
  loading: false,
  error: null,
};

export const CartSlice = createSlice({
  name: "Cartdata",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.added = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.deleted = action.payload;
      })
      .addCase(deleteToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.Cart = action.payload;
      })
      .addCase(getFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default CartSlice.reducer;
