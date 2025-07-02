
const productService = require('../services/productService');


exports.getAllProducts = (req, res) => {
    const result = productService.getAllProducts();
    res.send(result);
};

exports.getProductById = (req, res) => {
    const productId = req.params.id;
    const result = productService.getProductById(productId);
    res.send(result);
};

exports.addProduct = (req, res) => {
    const result = productService.addProduct();
    res.send(result);
};




