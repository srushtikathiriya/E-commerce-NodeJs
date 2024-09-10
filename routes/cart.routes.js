const express = require('express');
const cartRoutes = express.Router();
const {
    addToCart,
    updateToCart,
    deleteCart,
    getAllCarts
} = require("../controller/cart.controller");
const {verifyToken} = require("../helpers/tokenVerify")
// const { updateUser } = require('../controller/user.controller');

//  add new product - create
cartRoutes.post("/",verifyToken,addToCart);
cartRoutes.get("/",verifyToken,getAllCarts);
cartRoutes.put("/", verifyToken, updateToCart);
cartRoutes.put("/delete-cart", verifyToken, deleteCart);


module.exports = cartRoutes;