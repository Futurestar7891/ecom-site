import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const apiKey = import.meta.env.VITE_APP_URL;

export const getshippingaddress = createAsyncThunk(
  "addresses/getshippingaddress",
  async ({ Userid }) => {
    console.log("hello", Userid);
    try {
      const response = await fetch(
        "https://ecom-site-backend.vercel.app/api/getshippingaddress",
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
      console.log(data.Shippingaddress);
      return data.Shippingaddress;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateshippingaddress = createAsyncThunk(
  "addresses/updateshippingaddress",
  async ({ Index, Userid }) => {
    try {
      const response = await fetch(
        `https://ecom-site-backend.vercel.app/api/updateshippingaddress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Index: Index,
            Userid: Userid,
          }),
        }
      );
      const data = await response.json();
      console.log("so the problem is here : awww", data.errors);
      console.log(data.message);
      return data.message;
    } catch (error) {
      console.log(error);
    }
  }
);

export const ShippingaddressSlice = createSlice({
  name: "Shippingaddress",
  initialState: {
    Shippingaddress: {},
    message: "",
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getshippingaddress.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getshippingaddress.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.Shippingaddress = action.payload);
      })
      .addCase(getshippingaddress.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })
      .addCase(updateshippingaddress.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updateshippingaddress.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = null),
          (state.message = action.payload);
      })
      .addCase(updateshippingaddress.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      });
  },
});

export default ShippingaddressSlice.reducer;
