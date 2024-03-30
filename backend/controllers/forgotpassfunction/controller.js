// controllers/forgotpassfunction/controller.js
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const userSchema = require("../../modelschema/signupSchema");


// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gkmali49@gmail.com",
    pass:"izxg vkpp ukdc vrvv",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Function to send email
async function sendEmail(email, subject, text) {
  // Compose email
  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: subject,
    text: text,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Forgot password function
exports.forgotpassword = async (req, res) => {
 
  const { Email } = req.body;
  const errors = validationResult(req);

  try {
    if(!Email){
      return res.status(400).json({
        message:'please fill email first'
      })
    }
    else if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      
      const userexist = await userSchema.findOne({ Email: Email });
      if (userexist) {
        const id=userexist._id;
        const otp = Math.floor(Math.random() * 10000 + 1);
        await userexist.updateOne({
         
          "Key.OTP": otp,
          "Key.Expiretime": Date.now() + 600 * 1000,
        });

        // Send email with OTP
        const subject = "Password Reset OTP";
        const text = `Your OTP for password reset is: ${otp}. This OTP will expire in 1 minutes.`;
        await sendEmail(Email, subject, text);
        

        return res.status(200).json({
          success: true,
          Email:Email,
          message: "OTP sent successfully",
        });
        
      }

      return res.status(400).json({ success: false, message: "User doesn't exist" });
    } catch (error) {
      console.error("Error in forgot password process:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in forgot password process:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.forgotcondition = [
  body("Email", "please provide a valid email").isEmail(),
];
