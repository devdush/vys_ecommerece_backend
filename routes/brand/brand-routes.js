const express = require("express");
const {
  postBrand,
  getBrand,
  getBrands,
} = require("../../controllers/brand/brand-controller");
const router = express.Router();

router.post("/add", postBrand);
router.get("/get/:id", getBrand);

router.get("/get", getBrands);

module.exports = router;
