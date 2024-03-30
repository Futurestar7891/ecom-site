import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createaddress = createAsyncThunk(
  "addresses/createaddress",
  async ({Email,Name,Mobile,Altermobile,Pincode,Userid}) => {
    console.log("ented in the slice")
    try {
      const response = await fetch("http://localhost:3000/api/createaddress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              Email:Email,
              Name:Name,
              Mobile:Mobile,
              Altermobile:Altermobile,
              Pincode:Pincode,
              Userid:Userid
          }),
        }
      );
      const data=await response.json();
      console.log("so the problem is here : awww",data.errors)
      return data.message;
    } catch (error) {
        console.log(error)
    }
  }
);

export const getaddress = createAsyncThunk(
    "addresses/getaddress",
    async ({Userid}) => {
      try {
        const response = await fetch("http://localhost:3000/api/getaddress",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Userid:Userid
            }),
          }
        );
        const data=await response.json();
        return data.Addresses;
      } catch (error) {
          console.log(error)
      }
    }
  );

  export const updateaddress = createAsyncThunk(
    "addresses/updateaddress",
    async ({Email,Name,Mobile,Altermobile,Pincode,Userid,Index}) => {
      
      try {
        const response = await fetch("http://localhost:3000/api/updateaddress",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Email:Email,
              Name:Name,
              Mobile:Mobile,
              Altermobile:Altermobile,
              Pincode:Pincode,
              Userid:Userid,
              Index:Index
            }),
          }
        );
        const data=await response.json();
        console.log("so the problem is here : awww",data.errors)
        return data.message;
      } catch (error) {
          console.log(error)
      }
    }
  );

  export const deleteaddress = createAsyncThunk(
    "addresses/deleteaddress",
    async ({Index,Userid}) => {
      try {
        const response = await fetch("http://localhost:3000/api/deleteaddress",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
               Index:Index,
               Userid:Userid
            }),
          }
        );
        const data=await response.json();
        console.log(data.message);
        return data.message;
      } catch (error) {
          console.log(error)
      }
    }
  );
  
  

export const AddressSlice=createSlice({
    name:"Address",
    initialState:{
        Address:[],
        message:"",
        loading:false,
        error:null
    },
    reducers:{

    },

    extraReducers:(builder)=>{
       builder.addCase(createaddress.pending,(state)=>{
           state.loading=true,
           state.error=null
       })
       .addCase(createaddress.fulfilled,(state,action)=>{
        state.loading=false,
        state.error=null,
        state.message=action.payload
       })
       .addCase(createaddress.rejected,(state,action)=>{
           state.loading=false,
           state.error=action.error.message
       })
       .addCase(getaddress.pending,(state)=>{
        state.loading=true,
        state.error=null
    })
    .addCase(getaddress.fulfilled,(state,action)=>{
        state.loading=false,
        state.error=null,
        state.Address=action.payload
    })
    .addCase(getaddress.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.error.message
    })
    .addCase(updateaddress.pending,(state)=>{
        state.loading=true,
        state.error=null
    })
    .addCase(updateaddress.fulfilled,(state,action)=>{
        state.loading=false,
        state.error=null,
        state.message=action.payload
    })
    .addCase(updateaddress.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.error.message
    })
    .addCase(deleteaddress.pending,(state)=>{
        state.loading=true,
        state.error=null
    })
    .addCase(deleteaddress.fulfilled,(state,action)=>{
        state.loading=false,
        state.error=null,
        state.message=action.payload
    })
    .addCase(deleteaddress.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.error.message
    })
    }

})

export default AddressSlice.reducer;
