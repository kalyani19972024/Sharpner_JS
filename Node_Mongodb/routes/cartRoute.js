
const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

// POST /cart/add → add product to cart
router.post("/add", cartController.addToCart);

// GET /cart/:userId → get user’s cart
router.get("/:userId", cartController.getCart);

// DELETE /cart/remove → remove product from cart
router.delete("/remove", cartController.removeFromCart);

module.exports = router;
