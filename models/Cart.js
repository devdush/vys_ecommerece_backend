const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      itemCode: { type: String, required: true }, // Sync with Product model

      itemName: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      sales_price: { type: Number, required: true },
      totalItemPrice: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Cart", cartSchema);
