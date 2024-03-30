const express=require("express");
const { userdata, signupcondition } = require("../controllers/signuprouterfunction/controller");
const {logindata, logincondition, changedetails}=require("../controllers/Loginrouterfunction/controller");
const { changepasswordcondition, changepassword } = require("../controllers/newpasswordfunciton/changepassword");
const { getCartdata, CreateCartdata, deleteCartdata, updateCartdata } = require("../controllers/signuprouterfunction/cartdata");
const {createaddress,addresscondition,deleteaddress,updateaddress,getaddress}=require("../controllers/signuprouterfunction/addresses");
const { updateshippingaddress,getshippingaddress } = require("../controllers/signuprouterfunction/shippingaddress");
const router=express.Router();


router.route("/signup").post(signupcondition,userdata);
router.route("/login").post(logincondition,logindata);
router.route("/changedetails").post(signupcondition,changedetails);
router.route("/changepassword").post(changepasswordcondition,changepassword);
router.route("/addCartproducts").post(CreateCartdata);
router.route("/getCartproducts").post(getCartdata);
router.route("/deleteCartproducts").post(deleteCartdata);
router.route("/updatecartproducts").post(updateCartdata);
router.route("/createaddress").post(addresscondition,createaddress);
router.route("/updateaddress").post(addresscondition,updateaddress);
router.route("/deleteaddress").post(addresscondition,deleteaddress);
router.route("/getaddress").post(addresscondition,getaddress);
router.route("/getshippingaddress").post(getshippingaddress);
router.route("/updateshippingaddress").post(updateshippingaddress);


module.exports=router;