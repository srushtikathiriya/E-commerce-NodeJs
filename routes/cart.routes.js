const express = require("express");

const cartRoutes = express.Router();

const {addToCart, getAllCarts, updateToCart , deleteCart} = require("../controller/cart.controller");

const {verifyToken} = require("../helpers/tokenVerify");

cartRoutes.post("/" , verifyToken , addToCart);
cartRoutes.get("/" ,verifyToken, getAllCarts);
cartRoutes.put("/" ,verifyToken, updateToCart);
cartRoutes.delete("/" ,verifyToken, deleteCart);

module.exports = cartRoutes;