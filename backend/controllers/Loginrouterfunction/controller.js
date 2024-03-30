const userSchema = require("../../modelschema/signupSchema");
const { body, validationResult } = require("express-validator");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const tokenexpiretime = '1d';

exports.logindata = async (req, res) => {
  const { Email, Password } = req.body;
  const errors = validationResult(req);

  try {
    if (!Email || !Password) {
     return res.status(401).json({
        message: "please fill all details",
      });
    } else if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
      });
    }

    try {
      const userexist = await userSchema.findOne({
        Email: Email,
      });

      if (userexist) {
        const matchpassword=await bcrypt.compare(Password,userexist.Password);
        if (matchpassword) {
            const id=userexist._id;

            // generation jwt token

            const jwttoken=jwt.sign({id:id},(process.env.JWT_SECRET_KEY),{expiresIn:tokenexpiretime})

         return  res.status(200).json({
            success: true,
            message: "loged in successfully",
            Token:jwttoken,
            Name:userexist.Name,
            Role:userexist.Role,
            Img:userexist.Img.URL,
            Email:userexist.Email,
            Mobile:userexist.Mobile,
            id:id,
            Cart:userexist.Cart

          });
        } else {
         return  res.status(400).json({
            message: "wrorng password entered",
          });
        }
      }

     return res.status(400).json({
        success: false,
        message: "user dosent exist sign up first",
      });
    } catch (error) {
     return  res.status(500).json({
        message: "invalid user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "internal sever error",
    });
  }
};

exports.logincondition = [
  body("Email", "Please enter correct email").isEmail(),
  body("Password", "The length should be min 8")
    .isLength({ min: 8,max:100 }),
];


exports.changedetails = async (req, res) => {
  const {Email,id, Name, Mobile, Password,Img } = req.body;

  try {
    // Find the user by their ID
    const user = await userSchema.findById(id);

    // Update the user's details if provided
    if (Name){
      user.Name = Name;
    }
    if (Name){
      user.Email = Email;
    }
    if (Mobile) {
      user.Mobile = Mobile;
    }
    if (Password) {
      // Hash the new password before updating
      const hashedPassword = await bcrypt.hash(Password, 10);
      user.Password = hashedPassword;
    }
    if (Img) {
      user.Img.URL = Img;
    }
    await user.save();

    return res.status(200).json({
       success:true,
       message: "User details updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
