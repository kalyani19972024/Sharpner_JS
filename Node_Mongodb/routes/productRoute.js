
const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// GET /products → fetch all for shop
router.get("/", productController.getProducts);

// GET /products/:id → fetch single product for shop
router.get("/:id", productController.getProductById);

// NEW: Add product
router.post("/", productController.addProduct);


module.exports = router;
