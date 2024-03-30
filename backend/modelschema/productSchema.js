const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    Name:{
        type:String,
        required:[true,"please enter product name"]
    },

    Description:{
        type:String,
        required:[true,"Enter description"]
    },

   Price:{
    type:Number,
    required:[true,"Please enter the price"],
    maxLength:[8,"price should not exceeds 8 digit"]
   },

   Images:[
    {
          public_id:{
            type:String,
            required:true

          },

          URL:{
            type:String,
            required:true
          }
   }
],
   Category:{
      type:String,
      required:[true,"please enter product category"]
   },
   Rating:{
    type:Number,
    default:0
   },

   Brand:{
    type:String,
    default:""
   },

   Color:{
    type:String,
    default:""
   },
   Size:{
    type:String,
    default:""
   },


   Stock:{
    type:Number,
    required:[true,"please enter no. of stocks"],
    maxLength:[3,"price should not exceeds 3 digit"],
    default:1
   },
   Reviews:[{
    id:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
       },
    
       Comment:{
        type:String,
        required:true
       },

       Rating:{
        type:Number,
        required:true,
        maxLength:[5,"rating should not exeeds 5"],
        
       },

       Image:{
          type:String,
          required:true
       }
      
   }
   
],

CreatedOn:{
    type:Date,
    default:Date.now
}



})

module.exports=mongoose.model("Productdata",productSchema)