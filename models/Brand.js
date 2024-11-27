const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  brandTitle: {
    type: String,
    required: true,
    unique: true,
  },
});
const Brand = mongoose.model("Brand", BrandSchema);
module.exports = Brand;
