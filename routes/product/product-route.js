const express = require("express");
const {
  postProduct,
  getProducts,
  getProduct,
  getProductByCategory,
} = require("../../controllers/product/product-controller");

const router = express.Router();

router.post("/add", postProduct);
router.get("/get/:id", getProduct);
router.get("/get-products/:id", getProductByCategory);
router.get("/get", getProducts);
// router.put("/edit/:id", putMainCategory);
// router.delete("/delete/:id", deleteMainCategory);
module.exports = router;
