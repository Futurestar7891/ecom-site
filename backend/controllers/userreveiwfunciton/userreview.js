const { body, validationResult } = require("express-validator");
const userSchema = require("../../modelschema/signupSchema");
const Product = require("../../modelschema/productSchema");

exports.userreview = async (req, res) => {
    const errors = validationResult(req);
    const { Rating, Comment, Productid, Userid, Image } = req.body;
    

    try {
        if (!Rating && !Comment) {
            return res.status(401).json({
                message: "Please fill at least one field"
            });
        } else if (!errors.isEmpty()) {
            return res.status(401).json({
                errors: errors.array()
            });
        }

        const userexist = await userSchema.findById(Userid);
        if (!userexist) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const product = await Product.findById(Productid);
        if (!product) {
            return res.status(401).json({
                message: "Product not found"
            });
        }

        const reviewIndex = product.Reviews.findIndex(review => review.id === Userid);
        if (reviewIndex === -1) {
            product.Reviews.push({
                id: Userid,
                Name: userexist.Name,
                Rating: Rating,
                Comment: Comment,
                Image: Image
            });

            let totalRatings = 0;
            product.Reviews.forEach(review => {
                totalRatings += review.Rating;
            });
            product.Rating = totalRatings / product.Reviews.length;

            await product.save();

            return res.status(200).json({
                success: true,
                message: "Review submitted successfully"
            });
        } else {
            product.Reviews[reviewIndex].Name = userexist.Name;
            product.Reviews[reviewIndex].Rating = Rating;
            product.Reviews[reviewIndex].Comment = Comment;
            product.Reviews[reviewIndex].Image = Image;

            await product.save();

            return res.status(200).json({
                success: true,
                message: "Review updated successfully"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Technical error"
        });
    }
};

exports.reviewcondition = [
    body("Rating", "Rating should be a numeric value").isNumeric(),
    body("Comment", "Comment character length should not exceed 500 characters").isLength({ max: 500 })
];
