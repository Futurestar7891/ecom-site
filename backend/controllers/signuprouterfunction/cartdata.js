const userSchema = require("../../modelschema/signupSchema");

exports.CreateCartdata = async (req, res) => {
  const { Cartdata, Userid } = req.body;

 console.log("enterd in bakend")
   
  try {
    const userexist = await userSchema.findById(Userid);
    if (userexist) {
        try {
            const duplicatedata=userexist.Cart.some((product)=>product.Id===Cartdata.Id)
            if(!duplicatedata){
                try {
                    userexist.Cart.push(Cartdata);
                    const updatedUser = await userexist.save();
                    const Cartproducts=updatedUser.Cart
                    console.log(Cartproducts)
                
                    // Return the updated user document
                    res.status(200).json({
                        success:true,
                        message:"AddedToCart",
                    });
                } catch (error) {
                    res.status(500).json({
                        message:"technical server error cant be cart",error
                    })
                }
            }

            else{
                
                res.status(401).json({
                    message:"same item"
                })
            }
           
        } catch (error) {
            res.status(500).json({
                message:"the error is found",error
            })
        }
       
    }
    else{
        console.log("enterd in user not found")
        return res.status(404).json({ message: "User not found" });
    }

   
  } catch (error) {
    console.error("Error updating user cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.getCartdata=async(req,res)=>{
     const{Userid}=req.body
     console.log("enter in getdata backend")
     try {
        const userexist=await userSchema.findById(Userid);
        if(userexist){
            try {
                const Cartdata=userexist.Cart
                res.status(200).json({
                    success:true,
                    Cartdata:Cartdata
                })
            } catch (error) {
                res.status(500).json({
                    message:"problem in finding user"
                })
            }
           
        }
     } catch (error) {
        res.status(500).json({
            message:"Technical server error"
        })
     }
    

}

exports.deleteCartdata = async (req, res) => {
    const { index, Userid } = req.body;
  
   console.log("enterd in bakend")
     
    try {
      const userexist = await userSchema.findById(Userid);
      if (userexist) {
          try {
              userexist.Cart.splice(index,1);
              const updatedUser = await userexist.save();
              const Cartproducts=updatedUser.Cart
              console.log(Cartproducts)
          
              // Return the updated user document
              res.status(200).json({
                  success:true,
                  message:"Deleted From Cart",
              });
          } catch (error) {
              res.status(500).json({
                  message:"sonethineb eeror"
              })
          }
         
      }
      else{
          console.log("enterd in user not found")
          return res.status(404).json({ message: "User not found" });
      }
  
     
    } catch (error) {
      console.error("Error updating user cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  exports.updateCartdata=async(req,res)=>{
    const {Userid,Index,Quantity}=req.body;
    try {
          const userexist=await userSchema.findById(Userid);
          if(userexist){
             try {
                console.log("user found")
                const cartitem=userexist.Cart[Index];
                const newprice=((cartitem.Price)*Quantity)/(cartitem.Quantity)
    
                userexist.Cart[Index].Quantity = Quantity;
                userexist.Cart[Index].Price = newprice;

                await userexist.save();

                res.status(200).json({
                    message:"updated success fully quantity"
                })
             } catch (error) {
                res.status(500).json({
                    message:"internal server error"
                })
             }
          }
          else{
            console.log("user not found")
            res.status(401).json({
                message:"user not exist"
            })
          }
    } catch (error) {
        res.status(500).json({
            message:"internal server error",error
        })
    }
  }