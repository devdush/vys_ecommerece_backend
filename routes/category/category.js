const express = require("express");
const {
  postCategory,
  getCategories,
  putCategory,
  deleteCategory,

} = require("../../controllers/category/category-controller");
const router = express.Router();

router.post("/add", postCategory);
router.get("/get", getCategories);

router.put("/edit/:id", putCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
