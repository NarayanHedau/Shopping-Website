const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Review = new Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
      },
      productID: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
      },
      ratings: {
        type: Number,
        default: 0,
      },

      comment: {
        type: String,
      },
      numOfReview: {
        type: Number,
        default: 0,
      },

})
module.exports = mongoose.model("Review", Review);