let router = require("express").Router();
let log = require("../helper/logger");
let response = require("../helper/response");
let otpHelper = require("../helper/otp");
let encryptToken = require("../helper/token");
let sms = require("../helper/sms");
let mail = require("./sendmail/notify");
let authController = require("../controller/auth");
const commonController = require("../controller/commonController");
const ERRORS = require("../helper/errorMessage");
const _ = require("lodash");
const mongoose = require("mongoose");
const user = mongoose.model("User");
// const Bank = mongoose.model("Bank");
var config = require("../config.json");
const auth = require("../helper/auth");
var md5 = require("md5");
var cookie = require("cookie-parser");
let UserSession = mongoose.model("UserSession")

var bcrypt = require("bcrypt");
const { findOne } = require("../model/user/user.model");
const saltRounds = 10;
router.post("/register", async (req, res) => {
  try {
    if (req.body.designation !== "Admin") {
      let registerData = await authController.register(req.body);
      if (registerData) {
        let otp = otpHelper.generateOTP();
        let encryptedEmail = md5(req.body.email);
        registerData["otp"] = otp;
        let updatedData = await commonController.updateBy(
          user,
          registerData._id,
          {
            otp: otp,
            encryptedEmail: encryptedEmail,
          }
        );
        response.successResponse(res, 200, ERRORS.USER_SUCCESSFULLY_REGISTERED);
      } else {
        response.errorMsgResponse(res, 301, ERRORS.ADMIN_CANNOT_BE_REEGISTER);
      }
    }
  } catch (error) {
    console.log("======>>>>>>>");
    response.errorMsgResponse(res, 500, ERRORS.USER_ALREADY_REGISTERED);
  }
});
// router.post("/register", (req, res) => {
//   console.log(req.body);
//   if (req.body.designation !== "Admin") {
//     user
//       .findOne({
//         $or: [
//           {
//             email: req.body.email,
//           },
//           {
//             mobileNumber: req.body.mobileNumber,
//           },
//         ],
//       })
//       .then((resData) => {
//         // console.log("resData ============>>>>", resData);
//         if (resData) {
//           if (resData.password) {
//             console.log(resData.password);
//             response.errorMsgResponse(res, 301, ERRORS.USER_ALREADY_REGISTERED);
//           } else {
//             commonController
//               .updateWithObject(
//                 user,
//                 {
//                   _id: resData._id,
//                 },
//                 req.body
//               )
//               .then((resData) => {
//                 console.log("designation", resData.designation);
//                 var otp = otpHelper.generateOTP();
//                 var encryptedEmail = md5(req.body.email);
//                 log.debug("otp", otp, encryptedEmail);
//                 commonController
//                   .updateBy(user, resData._id, {
//                     otp: otp,
//                     encryptedEmail: encryptedEmail,
//                   })
//                   .then((updatedOTP) => {
//                     // sms(req.body.mobileNumber, otp)
//                     //   .then((resOTP) => {
//                     //     console.log("resData ", resData);

//                     response.successResponse(res, 200, updatedOTP);
//                   })
//                   .catch((error) => {
//                     log.error("error", error);
//                     response.errorMsgResponse(
//                       res,
//                       301,
//                       ERRORS.SOMETHING_WENT_WRONG
//                     );
//                   });
//                 // })
//                 // .catch((error) => {
//                 //   log.error("error", error);
//                 //   response.errorMsgResponse(
//                 //     res,
//                 //     301,
//                 //     ERRORS.SOMETHING_WENT_WRONG
//                 //   );
//                 // });
//               })
//               .catch((error) => {
//                 response.errorMsgResponse(res, 301, error);
//               });
//           }
//         } else {
//           console.log("==>>1reg");
//           authController
//             .register(req.body)
//             .then((resData) => {
//               var otp = otpHelper.generateOTP();
//               var customerId = otpHelper.generatePIN();
//               var encryptedEmail = md5(req.body.email);
//               log.debug("otp", otp, encryptedEmail);
//               commonController
//                 .updateBy(user, resData._id, {
//                   otp: otp,
//                   customerId: customerId,
//                   encryptedEmail: encryptedEmail,
//                   wallet: 0,
//                 })
//                 .then((updatedOTP) => {
//                   console.log("updatedOTP", updatedOTP);
//                   // sms(req.body.mobileNumber, otp)
//                   //   .then((resOTP) => {
//                   var mailConfig = {
//                     from: config.auth.user,
//                     email: req.body.email,
//                     subject: "Verify your mail",
//                     out:
//                       "hi, <a href='" +
//                       config.emailVerifyURL +
//                       encryptedEmail +
//                       "'>click here</a> to verify your mail",
//                   };
//                   console.log("mailConfig", mailConfig);
//                   mail
//                     .sendMail(mailConfig)
//                     .then((mainRes) => {
//                       commonController
//                         .getOne(user, {
//                           _id: resData._id,
//                         })
//                         .then(async (result) => {
//                           req.body["userId"] = result._id;
//                           await commonController.add(Bank, req.body);
//                           response.successResponse(res, 200, result);
//                         })
//                         .catch((error) => {
//                           log.error("error", error);
//                           response.errorMsgResponse(
//                             res,
//                             301,
//                             ERRORS.SOMETHING_WENT_WRONG
//                           );
//                         });
//                     })
//                     .catch((error) => {
//                       log.error("error", error);
//                       response.errorMsgResponse(
//                         res,
//                         301,
//                         ERRORS.SOMETHING_WENT_WRONG
//                       );
//                     });
//                   // commonController.getOne(user, {
//                   //     _id: resData._id
//                   //   })
//                   //   .then(async (result) => {
//                   //     req.body["userId"] = result._id;
//                   //     await commonController.add(Bank, req.body)
//                   //     response.successResponse(res, 200, result);
//                   //   }).catch((error) => {
//                   //     log.error("error", error);
//                   //     response.errorMsgResponse(
//                   //       res,
//                   //       301,
//                   //       ERRORS.SOMETHING_WENT_WRONG
//                   //     );
//                   //   });
//                 })
//                 .catch((error) => {
//                   log.error("error", error);
//                   response.errorMsgResponse(
//                     res,
//                     301,
//                     ERRORS.SOMETHING_WENT_WRONG
//                   );
//                 });
//               // })
//               // .catch((error) => {
//               //   log.error("error", error);
//               //   response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
//               // });
//             })
//             .catch((error) => {
//               console.log("OTP Not found");
//               response.errorMsgResponse(res, 301, error);
//             });
//         }
//       });
//   } else {
//     response.errorMsgResponse(res, 301, ERRORS.ADMIN_CANNOT_BE_REEGISTER);
//   }
// });

router.post("/login", (req, res) => {
  authController
    .login(req.body)
    .then((resData) => {
      var userValidData = _.pick(resData, [
        "_id",
        "firstName",
        "lastName",
        "mobileNumber",
        "email",
        "designation",
      ]);
      encryptToken
        .encrypt(req, userValidData)
        .then((resToken) => {
          userValidData["token"] = resToken.token;
          var responseData = _.pick(userValidData, [
            "firstName",
            "lastName",
            "mobileNumber",
            "email",
            "designation",
            "customerId",
            "token",
          ]);
          var responseobj = {
            id: resData._id,
            email: resData.email,
            profileURL: resData.profileURL,
            designation: resData.designation,
            firstName: resData.firstName,
            lastName: resData.lastName,
            phone: resData.mobileNumber,
            address: resData.address,
            customerId: resData.customerId,
            accessToken: userValidData.token,
          };
          response.successResponse(res, 200, responseobj);
        })
        .catch((error) => {
          log.error("error", error);
          response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
    })
    .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 505, error);
    });
});

router.post("/login/by/social", (req, res) => {
  authController
    .loginWithSocial(req.body)
    .then((resData) => {
      var userValidData = _.pick(resData, [
        "_id",
        "firstName",
        "lastName",
        "mobileNumber",
        "email",
        "designation",
      ]);
      encryptToken.encrypt(req, userValidData).then((resToken) => {
        console.log("resToken", resToken.token);
        userValidData["token"] = resToken.token;
        var responseData = _.pick(userValidData, [
          "firstName",
          "lastName",
          "mobileNumber",
          "email",
          "designation",
          "token",
        ]);
        var responseobj = {
          id: resData._id,
          firstName: resData.firstName,
          lastName: resData.lastName,
          email: resData.email,
          accessToken: userValidData.token,
          loginType: resData.loginType,
        };
        response.successResponse(res, 200, responseobj);
      });
    })
    .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});

router.get("/resend/otp/:mobile", (req, res) => {
  log.debug("/resend/otp/:mobile", req.params.mobile);
  if (req.params.mobile) {
    commonController
      .getOne(user, {
        mobileNumber: req.params.mobile,
      })
      .then((resData) => {
        if (resData) {
          var otp = otpHelper.generateOTP();
          commonController
            .updateBy(user, resData._id, {
              otp: otp,
            })
            .then((updatedOTP) => {
              sms(req.params.mobile, otp)
                .then((resOTP) => {
                  response.successResponse(res, 200, "Successfully send otp");
                })
                .catch((error) => {
                  log.error("error", error);
                  response.errorMsgResponse(res, 301, ERRORS.MOBILE_NOT_FOUND);
                });
            })
            .catch((error) => {
              log.error("error", error);
              response.errorMsgResponse(res, 301, ERRORS.MOBILE_NOT_FOUND);
            });
        } else {
          response.errorMsgResponse(res, 301, ERRORS.MOBILE_NOT_FOUND);
        }
      })
      .catch((error) => {
        log.error("error", error);
        response.errorMsgResponse(res, 301, error);
      });
  } else {
    response.errorMsgResponse(res, 301, ERRORS.MOBILE_NOT_FOUND);
  }
});

router.get("/resend/email/:email", (req, res) => {
  log.debug("/resend/email/:email", req.params.otp);
  var encryptedEmail = md5(req.params.email);
  if (req.params.email) {
    commonController
      .updateWithObject(
        user,
        {
          email: req.params.email,
        },
        {
          encryptedEmail: encryptedEmail,
        }
      )
      .then((updatedOTP) => {
        var mailConfig = {
          from: config.auth.user,
          email: req.params.email,
          subject: "Verify your mail",
          out:
            "hi, <a href='" +
            config.emailVerifyURL +
            encryptedEmail +
            "'>click here</a> to verify your mail",
        };
        mail
          .sendMail(mailConfig)
          .then((resMail) => {
            log.info(resMail);
            response.successResponse(res, 200, "Successfully send Email");
          })
          .catch((error) => {
            log.error(error);
            response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
          });
      })
      .catch((error) => {
        log.debug("error", error);
        response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
      });
  } else {
    response.errorMsgResponse(res, 301, ERRORS.EMAIL_NOT_FOUND);
  }
});

router.get("/verify/email/:email", (req, res) => {
  log.debug("req", md5(req.params.email));
  authController
    .verifyEmail(md5(req.params.email))
    .then((resData) => {
      res.redirect(config.appURL);
    })
    .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 301, error);
    });
});

router.get("/verify/mobile/:mobile/:otp", (req, res) => {
  log.debug("/verify/mobile/:mobile/:otp", req.params.otp);
  if (req.params.otp) {
    authController
      .verifyMobile(req.params.mobile, req.params.otp)
      .then((resData) => {
        response.successResponse(res, 200, "Mobile Number Verified");
      })
      .catch((error) => {
        log.error("error", error);
        response.errorMsgResponse(res, 301, error);
      });
  } else {
    response.errorMsgResponse(res, 301, ERRORS.WRONG_OTP);
  }
});

router.get("/send/otp/forgot/password/:mobileNumber", (req, res) => {
  user
    .findOne({
      mobileNumber: req.params.mobileNumber,
    })
    .then((validData) => {
      if (validData) {
        var otp = otpHelper.generateOTP();
        if (req.params.mobileNumber) {
          commonController
            .updateWithObject(
              user,
              {
                mobileNumber: req.params.mobileNumber,
              },
              {
                otp: otp,
              }
            )
            .then((updatedOTP) => {
              response.successResponse(res, 200, "otp sent " + otp);
              // sms(req.params.mobileNumber, otp)
              //   .then((smsData) => {
              //     console.log("smsData", smsData);
              //   })
              //   .catch((error) => {
              //     log.debug("error", error);
              //     response.errorMsgResponse(
              //       res,
              //       301,
              //       ERRORS.SOMETHING_WENT_WRONG
              //     );
              //   });
            })
            .catch((error) => {
              log.debug("error", error);
              response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
            });
        } else {
          response.errorMsgResponse(res, 301, ERRORS.EMAIL_NOT_FOUND);
        }
      } else {
        response.errorMsgResponse(res, 301, "your mobilenumber is not found ");
      }
    })
    .catch((error) => {
      log.error("error", error);
      response.errorMsgResponse(res, 301, error);
    });
});

router.post("/forget/password", async(req,res)=>{
  log.debug("/forget/password")
  try {
    const {mobileNumber, otp} = req.body
    let userData = await user.findOne({mobileNumber: mobileNumber})
    if (userData) {
      let otpData = await user.findOne({mobileNumber: mobileNumber, otp: otp})
      if (otpData) {
        let obj= {}
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(req.body.password, salt, async function (err, hash){
            let updateData = await commonController.updateWithObject(
              user,
              {mobileNumber: mobileNumber, otp: otp},
              {password: hash, otp: null}
            )
            response.successResponse(res, 200, "password updated Now you can login")
            console.log("=====>>>>>>update Data", updateData);
          })})
      } else {
        response.errorMsgResponse(res, 500, ERRORS.WRONG_OTP)
        
      }
    } else {
      response.errorMsgResponse(res, 500, ERRORS.MOBILE_NOT_FOUND)      
    }
  } catch (error) {
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
})

router.get("/getProfile", auth, (req, res) => {
  commonController
    .getOne(user, {
      _id: req.userId,
    })
    .then((resData) => {
      response.successResponse(res, 200, resData);
    })
    .catch((error) => {
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});

router.put("/update/profile", auth, (req, res) => {
  commonController
    .updateBy(user, req.userId, req.body)
    .then((resData) => {
      commonController
        .getOne(user, {
          _id: req.userId,
        })
        .then((data) => {
          response.successResponse(res, 200, data);
        })
        .catch((error) => {
          response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
        });
    })
    .catch((error) => {
      response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
    });
});



router.post("/logout", auth, (req, res) => {
  commonController
    .deleteWithObject(UserSession, {
      userId: req.userId,
      status: {
        $ne: "deleted",
      },
    })
    .then((resData) => {
      response.successResponse(res, 200, "Logout");
    })
    .catch((error) => {
      log.error(error)
      response.errorMsgResponse(res, 301, MESSAGE.SOMETHING_WENT_WRONG);
    });
});

router.post('/change/password', auth, async (req, res) => {
	try {
		const userData = await user.findOne({
			_id: req.userId
		})
		if (userData) {
			// console.log(userData.password)
			const passResult = await bcrypt.compare(req.body.password, userData.password)
			if (passResult) {
				// console.log('true')
				bcrypt.genSalt(saltRounds, function(err, salt) {
					bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
						user
							.findOneAndUpdate(
								{
									_id: req.userId,
									password: userData.password
								},
								{
									password: hash
								}
							)
							.then(resData => {
								// console.log('hash', hash)
								response.successResponse(res, 200, 'password updated Now you can login')
							})
							.catch(error => {
								// console.log('error', error)
								response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG)
							})
					})
				})
			} else {
				reject('Wrong password') //wrong Password
			}
		} else {
			response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG)
		}
	} catch (error) {
		console.log('error', error)
		response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG)
	}
})



module.exports = router;

//https://www.getpostman.com/collections/d98b54bd269184cfcf3c
