const userSchema=require("../../modelschema/signupSchema")
const {body,validationResult}=require("express-validator");
exports.getaddress=async(req,res)=>{
 const{Userid}=req.body;
    try {
        const userExist=await userSchema.findById(Userid);
        if(userExist){
            try {
                const Addresses=await userExist.Addresses;
                return res.status(200).json({
                success:true,
                message:"we got our data",
                Addresses:Addresses

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
exports.createaddress = async (req,res) => {
    console.log("entered in backend now");
    
    const { Userid, Name, Email, Mobile, Pincode,Altermobile } = req.body;
    const Value={
        Name:Name,
        Email:Email,
        Mobile:Mobile,
        Altermobile:Altermobile,
        Pincode:Pincode
    }
    const errors = validationResult(req);
    try {
        if (!Userid || !Name || !Email || !Mobile ||!Altermobile|| !Pincode) {
            console.log("entered in if");
            return res.status(401).json({
                success: false,
                message: "Please Enter all fields"
            });
        } else if (!errors.isEmpty()) {
            console.log("problem is here")
            return res.status(401).json({
                success: false,
                errors: errors.array(),
                message:"problem is of errors"
            });
        }

        const userExist = await userSchema.findById(Userid);
        if (!userExist) {
            console.log("user not found");
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        try {
            const addresses = await userExist.Addresses;
            addresses.push(Value);
            await userExist.save();

            return res.status(200).json({
                success: true,
                message: "The address is added successfully"
            });
        } catch (error) {
            console.error("Error in saving address:", error);
            return res.status(500).json({
                success: false,
                message: "Some technical error in finding user"
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "There is something technical error"
        });
    }
};


exports.updateaddress = async (req, res) => {
    const { Name,Email,Mobile,Altermobile,Pincode,Index,Userid} = req.body;
   const Value={
    Name:Name,
    Email:Email,
    Mobile:Mobile,
    Altermobile:Altermobile,
    Pincode:Pincode
   }
    const errors = validationResult(req);
    try {
        if (!Userid || !Name || !Email || !Mobile || !Altermobile || !Pincode || !Index) {
            return res.status(401).json({
                success: false,
                message: "Please Enter all fields"
            });
        } else if (!errors.isEmpty()) {
            return res.status(401).json({
                errors: errors.array()
            });
        } 

        const userExist = await userSchema.findById(Userid);
        if (!userExist) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            });
        }

            try {
                const addresses =await userExist.Addresses;
                addresses.splice(Index, 1, Value);
                await userExist.save();
                return res.status(200).json({
                    success: true,
                    message: "successfully updated "
                });
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "some technical error in finding user"
                });
            }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "there is something Technical error "
        });
    }
};



exports.deleteaddress=async(req,res)=>{
      const{Index,Userid}=req.body;
      try {
            const userExist=await userSchema.findById(Userid);
            if(!userExist){
                return res.status(401).json({
                    success:false,
                    message:"problem in finding user"
                })
            }
                try {
                    const addresses=await userExist.Addresses;
                    addresses.splice(Index,1);
                    await userExist.save();
                   return res.status(200).json({
                        success:true,
                        message:"successfully deleted "
                    })
                } catch (error) {
                   return  res.status(500).json({
                        success:false,
                        message:"some technical error in finding user"
                    })
                }
               
                
            }
        
        catch(error){
           return res.status(500).json({
                success:false,
                message:"the technical error "
            })
        }
    } 


    exports.addresscondition = [
        body("Name", "Please enter a valid name").isString().trim().notEmpty(),
        body("Email", "Please enter a valid email address").isEmail(),
        body("Mobile", "Please enter a valid mobile number").isNumeric().isLength({ min: 10 }),
        body("Altermobile", "Please enter a valid alternate mobile number").isNumeric().isLength({ min: 10 }),
        body("Pincode", "Please enter a valid pincode").isNumeric().isLength({ min: 6 }),
    ];
    