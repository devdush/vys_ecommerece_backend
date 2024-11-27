const mongoose = require("mongoose");

const MainCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
},{timestamps:true});
const MainCategory = mongoose.model("MainCategory", MainCategorySchema);
module.exports = MainCategory;
