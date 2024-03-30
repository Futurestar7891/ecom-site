const { body, validationResult } = require('express-validator');

const bcrypt=require("bcrypt");
const userSchema=require("../../modelschema/signupSchema")
exports.changepassword = async (req, res) => {
    const { Oldpassword, Newpassword, Confirmpassword, id } = req.body;
    console.log("entered in backend")
    const errors = validationResult(req);
    try {
        if (!Oldpassword || !Newpassword || !Confirmpassword || !id) {
            res.status(401).json({
                message: "Please enter all details"
            });
        } else if (!errors.isEmpty()) {
            res.status(401).json({ errors: errors.array() });
        }

        try {
            const userexist = await userSchema.findById(id);
            if (userexist) {
                try {
                    const matchpassword = await bcrypt.compare(Oldpassword, userexist.Password);
                    if (matchpassword) {
                        try {
                            const differentpass=await bcrypt.compare(Newpassword,userexist.Password);
                        if(!differentpass){
                            if (Newpassword === Confirmpassword) {
                                try {
                                    const hashpassword = await bcrypt.hash(Newpassword, 10);
                                await userexist.updateOne({ "Password": hashpassword });
        
                                res.status(200).json({
                            
                                    success: true,
                                    message: "Password changed successfully"
                                });
                                } catch (error) {
                                    res.status(500).json({
                                        message:"something really wrong"
                                    })
                                }
                                
                            } else {
                                res.status(401).json({
                                    message: "New password must match the confirm password"
                                });
                            }
                        }
                        
    
                        else{
                               res.status(401).json({
                                message:"the New password cant be same as old"
                               })
                        }
                        } catch (error) {
                            res.status(500).json({
                                message:"something went wrong"
                            })
                        }
                        
                    } else {
                        res.status(401).json({
                            message: "Old password does not match"
                        });
                    }
                } catch (error) {
                    res.status(500).json({
                        message:"some error occured"
                    })
                }
               
            } else {
                res.status(401).json({
                    message: "User does not exist"
                });
            }
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({
                success: false,
                message: "Technical server error occurred"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Technical server error"
        });
    }
};


exports.changepasswordcondition = [
    body("Newpassword", "PASSWORD SHOULD BE MIN 8 LENGTH").isLength({ min: 8 }),
    body("Oldpassword","PASSWORD SHOULD BE MIN 8 LENGTH").isLength({ min: 8 }),
    body("Confirmpassword","PASSWORD SHOULD BE MIN 8 LENGTH").isLength({ min: 8 }),
    

];
