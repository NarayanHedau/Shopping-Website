let router = require("express").Router();
const commonController = require("../../controller/commonController");
let response = require("../../helper/response");
const ERRORS = require("../../helper/errorMessage");
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
// const Bank = mongoose.model("Bank");
var config = require("../../config.json");
const auth = require("../../helper/auth");
let log = require("../../helper/logger");
let ApiFeatures = require("../../controller/apiFeatures");

router.post("/createProduct", async (req, res) => {
  try {
    log.debug("/create/product");

    const result = await commonController.add(Product, req.body);
    response.successResponse(
      res,
      200,
      ERRORS.PRODUCT_ADD_SUCCESSFULLY + result._id
    );
  } catch (error) {
    log.error(error);
    response.errorMsgResponse(res, 301, ERRORS.SOMETHING_WENT_WRONG);
  }
});

router.get("/getAllProduct", async (req, res) => {
  try {
    log.debug("/getAll/product");
    const result = await commonController.getAll(Product);
    response.successResponse(res, 200, result);
  } catch (error) {
    log.error(error);
    response.errorMsgResponse(res, 301, ERRORS.PRODUCT_NOT_FOUND);
  }
});

router.get("/getProduct/:id", async (req, res) => {
  try {
    log.debug("getProduct/:id");
    const result = await commonController.getBy(Product, {
      _id: req.params.id,
    });
    response.successResponse(res, 200, result);
  } catch (error) {
    log.error(error);
    response.errorMsgResponse(res, 500, ERRORS.PRODUCT_NOT_FOUND);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    log.debug("/update/product/:id");
    const result = await commonController.updateBy(
      Product,
      req.params.id,
      req.body
    );
    response.successResponse(
      res,
      200,
      ERRORS.PRODUCT_UPDATE_SUCCESSFULLY + result._id
    );
  } catch (error) {
    response.errorMsgResponse(res, 301, ERRORS.PRODUCT_NOT_FOUND);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    log.debug("/delete/product/:id");
    const result = await commonController.deletePRM(Product, {
      _id: req.params.id,
    });
    response.successResponse(
      res,
      200,
      ERRORS.PRODUCT_DELETED_SUCCESSFULLY + result._id
    );
  } catch (error) {
    response.errorMsgResponse(res, 301, ERRORS.PRODUCT_NOT_DELETED);
  }
});

router.get("/searchProduct", async (req, res) => {
  try {
    log.debug("/search/products");
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await apiFeatures.query;
    response.successResponse(res, 200, products);
  } catch (error) {
    log.error(error);
    response.errorMsgResponse(res, 301, ERRORS.PRODUCT_NOT_FOUND);
  }
});
module.exports = router;
