const categorySchema=require("../../modelschema/categorySchema");
exports.createcategory=async(req,res,next)=>{
    try {
       
        const {Name,Image}=req.body;
        if(!Name || !Image){
            res.status(401).json({
                message:"body must not be empty"
            })
        }

        const categoryexist=await categorySchema.findOne({Name:Name});
        if(categoryexist){
            return res.status(401).json({
                message:"the category already exists"
            })
        }

        const newcategory=await categorySchema.create(req.body);
        return res.status(200).json({
            success:true,
            newcategory
        })

        
    } catch (error) {
        console.log("there is something problem in creating the category");
    }
}
exports.getcategory=async(req,res)=>{
 try {
    const category= await categorySchema.find();
    if(category){
         return res.status(200).json({
            success:true,
            category
         })
    }
}
  catch (error) {
    console.log(error);
 }
}
    