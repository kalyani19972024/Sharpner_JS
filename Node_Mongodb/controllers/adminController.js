
const Product = require("../models/product");

// Fetch all products (admin view)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.fetchAll();
    // Optional: sort newest first
    products.sort((a, b) => b.createdAt - a.createdAt);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products for admin:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Fetch single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const prodId = req.params.id;
    const { name, price, description } = req.body;

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (price) updatedFields.price = price;
    if (description) updatedFields.description = description;

    const result = await Product.updateById(prodId, updatedFields);

    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const prodId = req.params.id;

    const result = await Product.deleteById(prodId);

    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
