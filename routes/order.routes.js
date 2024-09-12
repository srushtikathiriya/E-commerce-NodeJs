// const express = require('express');

// const orderRoutes = express.Router();

// const {addNewOrder,cancelOrder,showAllOrder} = require("../controller/order.controller");
// const {verifyToken} = require("../helpers/tokenVerify");

// orderRoutes.post("/",verifyToken,addNewOrder);
// orderRoutes.post('/delete', verifyToken, cancelOrder);
// orderRoutes.get('/',verifyToken,showAllOrder);

// module.exports = orderRoutes;

const express = require('express');
const orderRoutes = express.Router();
const {  addNewOrder, deleteOrder , showAllOrder } = require('../controller/order.controller');
const { verifyToken } = require('../helpers/tokenVerify');

orderRoutes.get('/',verifyToken,showAllOrder);

orderRoutes.post('/',verifyToken,addNewOrder);
orderRoutes.post('/delete',verifyToken,deleteOrder);

module.exports =  orderRoutes;