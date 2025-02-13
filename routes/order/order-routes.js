const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder,
} = require("../../controllers/order/order-controller");

const router = express.Router();

router.post("/", createOrder); // Place an order
router.get("/", getOrders); // Get orders for logged-in user
router.get("/:id", getOrderById); // Get order by ID
router.put("/:id/status", updateOrderStatus); // ✅ Update order status
router.get("/user/:userId", getOrdersByUser); // ✅ Update order status
router.delete("/:id", deleteOrder); // ✅ Delete an order

module.exports = router;
