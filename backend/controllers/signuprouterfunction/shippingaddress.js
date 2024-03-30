userSchema=require("../../modelschema/signupSchema")
exports.getshippingaddress=async(req,res)=>{
 const{Userid}=req.body;
 console.log("the shipping address is :",Userid)
    try {
        const userExist=await userSchema.findById(Userid);
        if(userExist){
            console.log("user found")
            try {
                const Shippingaddress=await userExist.Shippingaddress;
                return res.status(200).json({
                success:true,
                Shippingaddress:Shippingaddress

        })
            } catch (error) {
                return res.status(500).json({
                    success:false,
                    message:"problem in finding user"
                })
            }
        }
        else{
            res.status(401).json({
                message:"user not found"
            })
        }
        
      }
     catch (error) {
        res.status(500).json({
            message:"there is something Technical error "
        })
    }
}

exports.updateshippingaddress = async (req, res) => {
    const { Index, Userid } = req.body;
    console.log("Updating shipping address for Userid:", Userid, "Index:", Index);
    try {
        const userExist = await userSchema.findById(Userid);
        if (!userExist) {
            console.log("User not found");
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        const Indexaddress = userExist.Addresses[Index];
        if (!Indexaddress) {
            console.log("Address not found at index:", Index);
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }
      
        const Shippingaddress = userExist.Shippingaddress;
        
        Shippingaddress.Name=Indexaddress.Name,
        Shippingaddress.Email=Indexaddress.Email,
        Shippingaddress.Mobile=Indexaddress.Mobile,
        Shippingaddress.Altermobile=Indexaddress.Altermobile,
        Shippingaddress.Country=Indexaddress.Country,
        Shippingaddress.State=Indexaddress.State,
        Shippingaddress.City=Indexaddress.City,
        Shippingaddress.House=Indexaddress.House,
        Shippingaddress.Pincode=Indexaddress.Pincode

        await userExist.save();

        return res.status(200).json({
            success: true,
            message: "Shipping address updated successfully"
        });
    } catch (error) {
        console.error("Error in updateshippingaddress:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

    