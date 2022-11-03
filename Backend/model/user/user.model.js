const mongoose = require("mongoose");
const crypto = require("crypto");
  Schema = mongoose.Schema;

const User = new Schema(
  {
    designation: {
      type: String,
      enum: ["Super Admin", "Admin", "User"],
    },
    firstName: String,
    lastName: String,
    deviceToken: String,
    email: String,
    mobileNumber: String,
    location: {
      address: String,
      landmark: String,
      state: String,
      city: String,
      pincode: Number,
      country: String,
      lat: {
        type: String,
      },
      lng: {
        type: String,
      },
    },
    avatar: String,
    loginType: {
      type: String,
      enum: ["Google", "Facebook", "Password", "OTP"],
      default: "Password",
      required: true,
    },
    password: String,
    wallet: Number,
    username: String,
    status: {
      type: String,
      default: "active",
    },
    encryptedEmail: String,
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },

    dob: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isMobileVerified: {
      type: String,
      enum: ["Not", "Verified"],
      default: "Not",
    },
    isEmailVerified: {
      type: String,
      enum: ["Not", "Verified"],
      default: "Not",
    },
    otp: {
      type: String,
    },
    customerId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// //Generating password Reset Token
// User.method.getResetPasswordToken = function(){
// // Generate Token
// const resetToken = crypto.randomBytes(20).toString("hex");

// // Hashing and adding resetPasswordToken to UserSchema
// this.resetPasswordToken= crypto.createHash("sha256").update(resetToken).digest("hex");
// this.resetPasswordExpire= Date.now() + 15 * 60 * 1000;

// return resetToken;

// }
module.exports = mongoose.model("User", User);
