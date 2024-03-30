// New password function
const userSchema=require("../../modelschema/signupSchema");
const {body,validationResult}=require("express-validator");
const bcrypt=require("bcrypt");
exports.newpassword = async (req, res) => {
    const {Email, Password } = req.body;
    const errors=validationResult(req);
  
    try {
      if (!Password||!Email) {
        return res.status(401).json({ message: "Please enter password" });
      }
      else if(!errors.isEmpty()){
        return res.status(400).json({
            message:"chutiya password sahi daal"
        })
      }
  
      try {
        const userexist = await userSchema.findOne({Email:Email});

        if (userexist) {
          const hashpassword = await bcrypt.hash(Password, 10);
  
          await userexist.updateOne({ "Password": hashpassword });
  
          return res.status(200).json({
            success: true,
            message: "PASSWORD CHANGED SUCCESSFULLY",
          });
        }
  
        return res.status(401).json({
          success: false,
          message: "User does not exist with this email",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message:` the error is ${error.message}` ,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  exports.newpasswordcondition=[
    body("Password", "PASSWORD SHOULD BE MIN 8 LENGTH").isLength({min:8}),

  ]
  