
const User = require("../models/user");

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ error: "userId and productId are required" });
    }

    const user = await User.findUserById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.addToCart(productId);
    res.json({ message: "Product added to cart" });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

// Get cart items
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findUserById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const cartItems = await user.getCart();
    res.json(cartItems);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ error: "userId and productId are required" });
    }

    const user = await User.findUserById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.removeFromCart(productId);
    res.json({ message: "Product removed from cart" });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
};
