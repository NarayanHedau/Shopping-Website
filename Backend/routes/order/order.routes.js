let router = require("express").Router();
const commonController = require("../../controller/commonController");
let response = require("../../helper/response");
const ERRORS = require("../../helper/errorMessage");
const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const Product = mongoose.model("Product");
// const Bank = mongoose.model("Bank");
var config = require("../../config.json");
const auth = require("../../helper/auth");
let log = require("../../helper/logger");
const { Router } = require("express");

// Create New Order
router.post("/newOrder", auth, async (req, res) => {
  log.debug("/add/Order");
  try {
    const product = await commonController.getBy(Product, {
      _id: req.body.productID,
    });
    const { quantity } = req.body;
    product.forEach(async (e) => {
      productStock = e.stock;
      if (quantity <= productStock) {
        let object = Object.assign({ userID: req.userId }, req.body);
        const order = await commonController.add(Order, object);
        response.successResponse(res, 200, ERRORS.ADD_ORDER_SUCCESSFULLY);
      } else {
        response.successResponse(res, 200, `Product quantity is out of Stock`);
      }
    });
  } catch (error) {
    log.error(error);
    response.errorMsgResponse(res, 500, ERRORS.UNABLE_TO_ADD_ORDER);
  }
});

router.get("/getOrder/:id", auth, async (req, res) => {
  log.debug("/getOrder/:id");
  try {
    const result = await commonController.getSingleRecordByPopulate(
      Order,
      { _id: req.params.id },
      ["productID", "userID"]
    );
    response.successResponse(res, 200, result);
  } catch (error) {
    log.error(error);
    response.errorMsgResponse(res, 500, ERRORS.UNABLE_TO_FETCH_ORDER);
  }
});

// get all orders for admin
router.get("/getAllOrder", auth, async (req, res) => {
  try {
    log.debug("Get All Order");
    const result = await commonController.getAll(Order);
    response.successResponse(res, 200, result);
  } catch (error) {
    log.error(error);
    response.errorMsgResponse(res, 500, ERRORS.UNABLE_TO_GET_ALL_ORDER);
  }
});

// update Order Status -- Admin

// router.get("/updateOrderStatus", async (res, req) => {
//   try {
//     const product = await commonController.getBy(Product, {
//       _id: req.body.productID,
//     });
//     console.log("//////////////////////////////////////////", product);
//     const { quantity } = req.body;
//     const order = await commonController.getAll(Order);
//     if (order.orderStatus === "Delivered") {
//       // to check order Status
//       response.successResponse(res, 200, ERRORS.ALREADY_DELIVERED_THIS_ORDER);
//     } else {
//       product.forEach(async (e) => {
//         productStock = e.stock;
//         if (quantity <= productStock) {
//           const remainStock = productStock - quantity;
//           const updateProduct = await commonController.updateBy(
//             Product,
//             e._id,
//             {
//               stock: remainStock,
//             }
//           );
//           response.successResponse(res, 200, ERRORS.ADD_ORDER_SUCCESSFULLY);
//         }
//       });
//       order.orderStatus = req.body.status;
//       if (req.body.status === "Delivered") {
//         order.deliveredAt = Date.now();
//       }
//       await order.save({ validateBeforeSave: false });
//     }
//   } catch (error) {
//     log.error(error);
//     response.errorMsgResponse(res, 500, ERRORS.UNABLE_TO_GET_ALL_ORDER);
//   }
// });

// router.get("/updateOrderStatus", async (req, res) => {
//   try {
//     log.debug("/updateOrderStatus");
//     const product = await commonController.getBy(Product, {
//       _id: req.body.productID,
//     });
//     console.log("//////////////////////////////////////////", product);
//     // const { quantity } = req.body.productID;
//     const order = await commonController.getAll(Order);
//     console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<", order);
//     if (order.orderStatus === "Delivered") {
//       // to check order Status
//       response.successResponse(res, 200, ERRORS.ALREADY_DELIVERED_THIS_ORDER);
//     } else {
//       product.forEach(async (e) => {
//         productStock = e.stock;
//         console.log("______________________________", remainStock);
//         if (quantity <= productStock) {
//           const remainStock = productStock - quantity;

//           const updateProduct = await commonController.updateBy(
//             Product,
//             e._id,
//             {
//               stock: remainStock,
//             }
//           );
//           console.log(
//             "?????????????????????????????????????????",
//             updateProduct
//           );
//           response.successResponse(res, 200, ERRORS.ADD_ORDER_SUCCESSFULLY);
//         }
//       });
//       order.orderStatus = req.body.status;
//       if (req.body.status === "Delivered") {
//         order.deliveredAt = Date.now();
//       }
//       await order.save({ validateBeforeSave: false });
//     }
//   } catch (error) {
//     log.error(error);
//     response.errorMsgResponse(res, 500, ERRORS.UNABLE_TO_GET_ALL_ORDER);
//   }
// });

//  get All product by using UserID for user
router.get("/getAllProduct/purchase/:userID", auth, async (req, res) => {
  try {
    log.debug("/getAll/Product/Purchase/byUserID");
    const userOrder = await commonController.getBy(Order, {
      userID: req.params.userID,
    });
    response.successResponse(res, 200, userOrder);
  } catch (error) {
    log.error(error);
    response.errorMsgResponse(res, 500, ERRORS.UNABLE_TO_GET_ALL_ORDER);
  }
});

// get product by using productID for user
router.get("/getProduct/purchase/:productID", auth, async (req, res) => {
  try {
    log.debug("/getAll/Product/Purchase/byUser");
    const userOrder = await commonController.getBy(Order, {
      productID: req.params.productID,
    });
    response.successResponse(res, 200, userOrder);
  } catch (error) {
    log.error(error);
    response.errorMsgResponse(res, 500, ERRORS.UNABLE_TO_GET_ORDER);
  }
});

module.exports = router;
