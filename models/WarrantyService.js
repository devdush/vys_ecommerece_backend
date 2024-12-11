const mongoose = require("mongoose");

const WarrantyServiceSchema = new mongoose.Schema({
  duration: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});
const WarrantyService = mongoose.model(
  "WarrantyService",
  WarrantyServiceSchema
);
module.exports = WarrantyService;
