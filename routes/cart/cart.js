const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cart/cart-conroller");

router.get("/get/:userId", cartController.getCart);
router.post("/add", cartController.addToCart);
router.post("/remove", cartController.removeFromCart);
router.delete("/clear/:userId", cartController.clearCart);

module.exports = router;
