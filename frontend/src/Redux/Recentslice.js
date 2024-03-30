import { createSlice } from '@reduxjs/toolkit';

export const visitSlice = createSlice({
    name: 'visited',
    initialState: {
        product: []
    },
    reducers: {
        visited: (state, action) => {
            const newProduct = action.payload;
            
            const productexist = state.product.some(product => product._id === newProduct._id);
            if (!productexist) {

                if (state.product.length >= 10) {
                    state.product.pop();
                    state.product.splice(0,0,newProduct);
                }
                else{
                    state.product.splice(0,0,newProduct);
                }
                
            }
        }
    }
});

export const { visited } = visitSlice.actions;

export default visitSlice.reducer;
