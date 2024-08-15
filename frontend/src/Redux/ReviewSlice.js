import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const apiKey =import.meta.env.VITE_APP_URL
export const Submitreview = createAsyncThunk(
  "Review/submitreview",
  async ({ Rating, Comment, Productid, Userid, Img }) => {
    console.log("enterd in the slice", Productid);

    try {
      const response = await fetch(
        `https://ecom-site-backend.vercel.app/api/reviewproducts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Userid: Userid,
            Productid: Productid,
            Rating: Rating,
            Comment: Comment,
            Image: Img,
          }),
        }
      );

      const data = await response.json();
      console.log(data.message);
      return data.message;
    } catch (error) {
      console.log("there is some problem in review");
    }
  }
);

export const Reviewslice = createSlice({
  name: "Review",
  initialState: {
    message: "",
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(Submitreview.pending, (state) => {
        (state.loading = true), (state.error = null);
      })

      .addCase(Submitreview.fulfilled, (state, action) => {
        state.message = action.payload;
        (state.loading = false), (state.error = null);
      })
      .addCase(Submitreview.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      });
  },
});

export default Reviewslice.reducer;
