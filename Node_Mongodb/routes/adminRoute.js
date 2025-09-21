
const express = require("express");
const adminController = require("../controllers/adminController");

const router = express.Router();

// GET /admin/products
router.get("/products", adminController.getAllProducts);
router.get("/products/:id", adminController.getProductById);
router.put("/products/:id", adminController.updateProduct);
router.delete("/products/:id", adminController.deleteProduct);


module.exports = router;
