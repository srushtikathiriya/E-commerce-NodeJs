
const express = require('express');
const {verifyToken} = require("../helpers/tokenVerify")
const { addToCart , deleteToCart , updateToCart , getAllCart } = require('../controller/cart.controller');

const CartRoutes = express.Router();

CartRoutes.get('/',verifyToken,getAllCart); 

CartRoutes.post('/',verifyToken,addToCart); // - [Done]

CartRoutes.put('/updateCart',verifyToken,updateToCart);  // - [Done]

CartRoutes.delete('/deleteCart',verifyToken,deleteToCart); //  - [Done]

module.exports = CartRoutes;
