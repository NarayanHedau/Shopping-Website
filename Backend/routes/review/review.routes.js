let router = require("express").Router();
let log = require("../../helper/logger");
let response = require("../../helper/response");
const commonController = require("../../controller/commonController");
const ERRORS = require("../../helper/errorMessage");
const _ = require("lodash");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Product = mongoose.model("Product");
const Review = mongoose.model("Review");
const auth = require("../../helper/auth");


router.post("/addReview", auth, async(req,res) => {
  try {
    log.debug("/add/review")
    const userData = await commonController.getOne(User, req.userID)
    let object = Object.assign({userID: req.userId}, req.body)
    if(userData){
      const productData = await commonController.getOne(Review, {productID:req.body.productID, userID: req.userId, status:{$ne: "deleted"}});
      if (productData) {
        const updateReview = await Review.findOneAndUpdate({productID:req.body.productID, userID: req.userId},{ratings:req.body.ratings, comment: req.body.comment})
        response.successResponse(res, 200, ERRORS.REVIEW_UPDATE_SUCCESSFULLY)
      }
      else{
      const productReview = await commonController.add(Review, object);
      response.successResponse(res, 200, ERRORS.REVIEW_ADDED_SUCCESSFULLY)
    }
   }
  } catch (error) {
    log.error(error)
    response.errorMsgResponse(res, 500, ERRORS.UNABLE_TO_ADD_REVIEW)
  }
})

router.get("/getProductsAndReviews/:id", async(req,res)=>{
  try {

    let avgRating = []
    const productData = await commonController.getOne(Product, {_id:req.params.id} )

    const reviewData = await commonController.getBy(Review, {productID:productData._id})
   
    reviewData.forEach(e=>{
      avgRating.push(e.ratings)
    })
    const sum = avgRating.reduce((pre,post)=>(result = pre + post))
    const avg = sum / avgRating.length;
    const obj = { product: productData, review:reviewData, averageRating: avg}
    
    response.successResponse(res, 200, obj)
  } catch (error) {
    log.error(error)
    response.errorMsgResponse(res, 500, error)
  }
})

// get all reviews of a Product
router.get("/getAllReviews/:productID", async(req, res)=> {
  try {
    log.debug("/getAll/Reviews")
    const result = await commonController.getBy(Review,{productID:req.params.productID})
    response.successResponse(res, 200, result)
  } catch (error) {
    log.error(error)
    response.errorMsgResponse(res, 500, ERRORS.REVIEW_NOT_FOUND)
  }
})
// Create New Review or Update The Review
// router.put("/review", auth, async(req,res) => {
//   try {
//     const {rating,comment,productId} = req.body;// for used to put in body
//     const review = {
//       user:req.userId,
//       name:req.firstName,
//       rating:Number(rating),
//       comment,
//     } //use to just like schema
//     const product = await Product.findById(productId);

//     // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",product);
//     const isReviewed = await Product.find({userId:req.userId})
//     // console.log("============================>>>>>>>>>",isReviewed);
//     if (isReviewed) {
//       product.reviews.forEach(e => {
//         if(req.userId)
//         e.rating = rating,
//         e.comment =comment
//       });
//     } else {
//       product.reviews.push(review);
//       product.numOfReview = product.reviews.length;
//     }

//     // creating Average of ratings
//     let avg = 0;
//      product.reviews.forEach(ele => {
//       avg+=ele.rating;
//     });
//     product.ratings = avg / product.reviews.length;

//     await product.save({validateBeforeSave:false});
//     response.successResponse(res, 200);

//   } catch (error) {
//     log.error(error)
//   }
// })


module.exports = router;