const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  brandTitle: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});
const Brand = mongoose.model("Brand", BrandSchema);
module.exports = Brand;
