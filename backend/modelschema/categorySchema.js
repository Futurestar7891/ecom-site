const mongoose=require("mongoose");

const categorySchema=mongoose.Schema({

    Name:{
        type:String,
        required:true
    },

    Image:{
            type:String,
            required:true
          }
})

module.exports=mongoose.model("Category",categorySchema);

