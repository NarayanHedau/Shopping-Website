const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const Order = new Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
  },

  quantity: {
    type: Number,
    required: true,
  },
  productID: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      // required: true,
    },
  },
  paidAt: {
    type: Date,
    // required: true,
  },

  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", Order);
