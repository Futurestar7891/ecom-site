const express = require("express");
const {forgotpassword,forgotcondition}=require("../controllers/forgotpassfunction/controller");
const { verifyotpcondition, verifyotp } = require("../controllers/varifyotpfunciton/controller");
const { newpasswordcondition, newpassword } = require("../controllers/newpasswordfunciton/controller");


const router = express.Router();

router.route("/forgotpassword").post(forgotcondition,forgotpassword);
router.route("/verifyotp").post(verifyotpcondition,verifyotp);
router.route("/newpassword").post(newpasswordcondition,newpassword);


module.exports = router;
