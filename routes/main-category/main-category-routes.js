const express = require("express");
const {
  postMainCategory,
  getMainCategoryById,
  getMainCategory,
  putMainCategory,
  deleteMainCategory,
  getCategoriesByMainCategory
} = require("../../controllers/main-category/main-category-controller");

const router = express.Router();

router.post("/add", postMainCategory);
router.get("/get/:id", getMainCategoryById);
router.get("/get-categories/:id", getCategoriesByMainCategory);
router.get("/get", getMainCategory);
router.put("/edit/:id", putMainCategory);
router.delete("/delete/:id", deleteMainCategory);
module.exports = router;
