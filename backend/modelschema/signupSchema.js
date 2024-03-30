const mongoose = require("mongoose");

const signupschema = mongoose.Schema({
  Role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  Img:{
    URL:{
      type:String,
      default:"https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709769600&semt=ais"
    }
    
  },
  Name: {
    type: String,
    required: true,
  },

  Mobile: {
    type: Number,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },
  Cart: [
    {
      Id: {
        type:String,
        default:""
      },
      Quantity: {
        type: Number,
        default: 1
      },
      Name:{
        type:String,
        required:true
      },

      Img:{
          URL:{
            type:String,
            default:""

          }
      },

      Price:{
        type:Number,
        default:0
      }

    }
  ],

  Orders:[
    {
      UserName:{
        type: String,
      },
      Products:[{
            Productname:{
              type:String
            },
            ProductId:{
              type:String
            },
            ProductQuantity:{
              type:Number
            },
            ProductPrice:{
              type:Number
            }
      }],
      UserEmail:{
        type: String,
      },
      UserMobile:{
        type:Number
      },
      UserAltermobile:{
        type:Number
      },
      UserCountry:{
        type:String
      },
      UserState:{
        type:String
      },
      UserCity:{
        type:String
      },
      UserHouse:{
        type:String
      },
      UserPincode:{
        type:Number
      },
      PaymentMode:{
        type: String,
        enum: ["Online", "CashOnDelivery"],
      }
    }
  ],
  Addresses:[
    {
      Name: {
        type: String,
        
      },
    
      Mobile: {
        type: Number,
        
      },
      Altermobile:{
        type: Number,
        
      },
      Email: {
        type: String,
        
        
      },
       Country:{
         type:String,
        
       
       },
       State:{
        type:String,
       
        
      },
      City:{
        type:String,
        
      
      },
      
      House:{
        type:String,
        
        
      },
      Pincode:{
        type:Number,
       
        
      }
    }
  ],

  Shippingaddress:{
    Name: {
      type: String,
      default:"Gajanand mali"
    },
  
    Mobile: {
      type: Number,
      default:9358179840
    },
    Altermobile:{
      type: Number,
      default:null
    },
    Email: {
      type: String,
      
      default:""
    },
     Country:{
       type:String,
       
       default:""
     },
     State:{
      type:String,
      
      default:""
    },
    City:{
      type:String,
      
      default:""
    },
    
    House:{
      type:String,
      
      default:""
    },
    Pincode:{
      type:Number,
      
      default:null
    }
  },
  Key: {
    OTP: {
      type: Number,
    },

    Expiretime: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = mongoose.model("signupdata", signupschema);
