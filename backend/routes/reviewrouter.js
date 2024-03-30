const express=require("express");
const { reviewcondition, userreview } = require("../controllers/userreveiwfunciton/userreview");

const router=express.Router();

router.route("/reviewproducts").post(reviewcondition,userreview);

module.exports=router;