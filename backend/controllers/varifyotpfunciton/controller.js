// OTP Verification function
const userSchema = require("../../modelschema/signupSchema");

const { body, validationResult } = require("express-validator");

exports.verifyotp = async (req, res) => {
  const { OTP,Email } = req.body;
  console.log("otp is",OTP);
  console.log("email send to backend",Email)

  const errors = validationResult(req);

  try {
    if (!OTP || !Email) {
      return res.status(401).json({ message: "Please enter email and otp first" });
    } else if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid OTP format",
        errors: errors.array(),
      });
    }

    try {
      const userexist = await userSchema.findOne({Email:Email});
      if (userexist) {
        if (userexist.Key.OTP == OTP) {
          const timeduration = userexist.Key.Expiretime - Date.now();
          if (timeduration < 0) {
            return res.status(400).json({
              success: false,
              message: "OTP has expired. Please resend it.",
            });
          }
          return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Incorrect OTP",
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: "user dosent exist",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

exports.verifyotpcondition = [
  body("OTP", "Enter a valid OTP").isNumeric().isLength({ min: 4, max: 4 }),
];
