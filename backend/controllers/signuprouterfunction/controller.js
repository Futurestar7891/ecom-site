const userSchema = require("../../modelschema/signupSchema");
const { body, validationResult } = require("express-validator");
const bcrypt=require("bcrypt")

exports.userdata = async (req, res) => {

  const { Email, Name, Mobile,Password } = req.body;
  const errors=validationResult(req);
  try {
    if (!Email ||!Name || !Mobile ||!Password) {
      return res.status(401).json({
        message: "please fill all details",
      });
    }

    else if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()});
       }
    // Check if the user with the provided email already exists
    try {
      const userExist = await userSchema.findOne({ Email: Email });

      if (userExist) {
        return res.status(401).json({
          message: "User already exists",
        });
      }

      // Create a new user

      const hashedPassword = await bcrypt.hash(Password, 10);

      // const newUser = await userSchema.create(req.body);

      // if want to hash password write like this
      const newUser = await userSchema.create({
        Email,
        Name,
        Mobile,
        Password: hashedPassword,
      });

      return res.status(200).json({
        success: true,
        message: "User registered successfully",
        newUser,
      });
    } catch (error) {
      console.log(error.message)
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.signupcondition = [
  body("Email", "please fill correct email").isEmail(),
  body("Mobile", "please fill correct mobile number").isNumeric().isLength({ min: 10, max: 10 }),
    
  
  body("Password", "Password should be at least 8 characters long and contain both letters and numbers")
  .isLength({ min: 8 }),
  
    
   
];
