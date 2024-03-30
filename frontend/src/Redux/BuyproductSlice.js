import { createSlice } from "@reduxjs/toolkit";

export const BuyproductSlice=createSlice({
    name:"Buyproduct",
    initialState:{
        Product:[
            
        ],
        loading:false,
        error:null
    },

    reducers:{
        setProduct:(state,action)=>{
           
            console.log(action.payload);
            if(state.Product.length===0){
                state.Product.push(action.payload)
            }
            else{
                state.Product.splice(0,state.Product.length);
                state.Product.push(action.payload)
            }
        },setmulProduct:(state,action)=>{
            console.log(action.payload)
            state.Product=action.payload;
        },
        updateQuantity:(state,action)=>{
            const{Quantity,idx}=action.payload;
            state.Product[idx].Price=((state.Product[idx].Price)*Quantity)/state.Product[idx].Quantity
             state.Product[idx].Quantity=Quantity;
        },
        deleteProduct:(state,action)=>{
            const {idx}=action.payload;
            state.Product.splice(idx,1)
        }

    }

})
export const{setProduct,setmulProduct,updateQuantity,deleteProduct}=BuyproductSlice.actions;
export default BuyproductSlice.reducer;