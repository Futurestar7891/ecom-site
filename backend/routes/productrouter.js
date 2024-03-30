const express=require("express");

const  {getallproduct,createproduct,updateproduct, deleteitem, getproductbyid}  = require("../controllers/productrouterfuncion/controller");
const {createcategory,getcategory} =require("../controllers/productrouterfuncion/category")
const router=express.Router()

// making route

router.route('/getallproduct').get(getallproduct);
router.route('/getproductbyid/:id').get(getproductbyid);
router.route('/createproduct').post(createproduct);
router.route('/updateproduct/:id').put(updateproduct);
router.route('/deleteproduct/:id').delete(deleteitem);
router.route('/createcategory').post(createcategory);
router.route('/getcategory').get(getcategory);

module.exports=router;