const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Product = new Schema({
  name: {
    type: String,
    required: [true, "Please enter Product Name"],
  },
  description: {
    type: String,
    required: [true, "Please enter Product Description"],
  },
  price: {
    type: String,
    required: [true, "Please enter Product Price"],
    required: [8, "Price cannot exceed 8 Characters"],
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    // required: true,
  },

  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  image: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter Product Category"],
  },
  stock: {
    type: String,
    required: [true, "Please enter Product Stock"],
    maxLength: [4, "Stock cannot exceed 4 character"],
    default: 1,
  },
  // numOfReview: {
  //   type: Number,
  //   default: 0,
  // },
  // reviews: [
  //   {
  //     name: {
  //       type: String,
  //       // required: true,
  //     },
  //     rating: {
  //       type: String,
  //       // required: true,
  //     },
  //     comment: {
  //       type: String,
  //       // required: true,
  //     },
  //   },
  // ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", Product);
