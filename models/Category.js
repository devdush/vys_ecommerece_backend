const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  categoryTitle: {
    type: String,
    required: true,
    unique: true,
  },
  mainCategory: {
    type: new mongoose.Schema({
      id: {
        type: String,
      },
      title: {
        type: String,
      },
    }),
  },
});
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
