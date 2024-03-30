import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
    name: 'filter',
    initialState: {
      filters: {
        page:1,
        minprice:0,
        maxprice: 50000,
        brand: "",
        size: "",
        keyword: "",
        rating:0,
        color:""
        
      },
    },
    reducers: {
      setFilter: (state, action) => {
        const { filterName, filterValue } = action.payload;
        state.filters[filterName] = filterValue;
      },
      clearFilter: (state, action) => {
        const { filterName } = action.payload;
        state.filters[filterName] = "";
      },
      clearAllFilters: (state) => {
        state.filters = {
          page:1,
          minprice: 0,
          maxprice: 50000,
          brand: "",
          size: "",
          keyword: "",
          rating:0,
          color:""
        };
      },
    },
  });
  
  export const { setFilter, clearFilter, clearAllFilters } = filterSlice.actions;
  
  export default filterSlice.reducer;
  