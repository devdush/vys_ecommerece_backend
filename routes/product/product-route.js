const express = require("express");
const {
  postProduct,
  getProducts,
  getProduct,
  getProductByCategory,
  getFeaturedProducts,
  getOnSaleProducts,
  getTopRatedProducts,
  getSpecialOfferProducts
} = require("../../controllers/product/product-controller");

const router = express.Router();

router.post("/add", postProduct);
router.get("/get", getProducts);
router.get("/get/featured",getFeaturedProducts)
router.get("/get/onSale",getOnSaleProducts)
router.get("/get/topRated",getTopRatedProducts)
router.get("/get/special",getSpecialOfferProducts)
router.get("/get/:id", getProduct);
router.get("/get-products/:id", getProductByCategory);
// router.put("/edit/:id", putMainCategory);
// router.delete("/delete/:id", deleteMainCategory);
module.exports = router;
