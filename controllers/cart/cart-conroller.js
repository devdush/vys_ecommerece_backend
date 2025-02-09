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
    res.json(cart);
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
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].totalItemPrice =
          cart.items[itemIndex].quantity * product.sales_price;
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
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.totalItemPrice,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
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
