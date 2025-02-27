const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

// Get cart by user ID
const getCart = async (req, res) => {
  console.log("req.body");
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "items.product"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if requested quantity exceeds stock
    if (quantity > product.onHand) {
      return res
        .status(400)
        .json({ message: `Only ${product.onHand} items available in stock` });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            product: productId,
            itemCode: product.itemCode,
            itemName: product.itemName,
            quantity,
            sales_price: product.sales_price,
            totalItemPrice: product.sales_price * quantity,
          },
        ],
        totalPrice: product.sales_price * quantity,
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        const newQuantity = cart.items[itemIndex].quantity + quantity;
        // Check if new quantity exceeds stock
        if (newQuantity > product.onHand) {
          return res.status(400).json({
            message: `Only ${product.onHand} items available in stock`,
          });
        }

        cart.items[itemIndex].quantity = newQuantity;
        cart.items[itemIndex].totalItemPrice =
          newQuantity * product.sales_price;
      } else {
        cart.items.push({
          product: productId,
          itemCode: product.itemCode,
          itemName: product.itemName,
          quantity,
          sales_price: product.sales_price,
          totalItemPrice: product.sales_price * quantity,
        });
      }

      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.totalItemPrice,
        0
      );
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    console.log("removeFromCart called with:", req.body); // Debugging log

    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      console.log("Cart not found for user:", userId);
      return res.status(404).json({ message: "Cart not found" });
    }

    console.log("Cart before removing item:", cart.items);

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    console.log("Cart after removing item:", cart.items);

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.totalItemPrice,
      0
    );

    await cart.save();
    console.log("Updated cart saved successfully!");

    res.json(cart);
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.status(500).json({ error: error.message });
  }
};


// Clear entire cart
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addToCart,
  clearCart,
  removeFromCart,
  getCart,
};
