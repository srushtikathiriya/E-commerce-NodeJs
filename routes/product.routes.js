const express = require('express');
const {addNewProduct , getAllProduct , updateProduct , deleteProduct} = require('../controller/product.controller');
const productRoutes = express.Router()
const {verifyToken} = require('../helpers/tokenVerify')

productRoutes.post("/" , verifyToken , addNewProduct);

// Get All Product
productRoutes.get("/" , getAllProduct);


// Update Product
productRoutes.put("/" , updateProduct);

// Delete Product
productRoutes.delete("/" , deleteProduct);

module.exports = productRoutes;