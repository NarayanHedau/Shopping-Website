module.exports = (app) => {
  let authRoute = require("./auth.routes");
  let userRoute = require("./user/user.routes");
  let uploadRoute = require("./upload.routes");
  let createProduct = require("./Product/product.routes");
  let reviewProduct = require("./review/review.routes");
  let orderProduct = require("./order/order.routes");

  app.use("/api/authentication", authRoute);
  app.use("/api/user", userRoute);
  app.use("/api/upload", uploadRoute);
  app.use("/api/product", createProduct);
  app.use("/api/review", reviewProduct);
  app.use("/api/order", orderProduct);
};
