require("dotenv").config()
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ports = process.env.PORT;
const server = express();



// in-built middleware
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use("/public/images",express.static(path.join(__dirname,"public/images")))

server.get('/',(req,res)=>{
    res.send({msg:"welcome to Express"});
    res.end();
})

// User routes
const userRoutes = require("./routes/user.routes");
server.use("/api/user",userRoutes);

// OTP routes
const otpRoutes = require('./routes/otp.routes');
server.use("/api/otp",otpRoutes);

// Product routes
const productRoutes = require("./routes/product.routes");
server.use("/api/product",productRoutes);

// cart routes
const CartRoutes = require("./routes/cart.routes");
server.use("/api/carts",CartRoutes);

// order routes
const orderRoutes = require("./routes/order.routes");
server.use("/api/orders",orderRoutes);


server.listen(ports, () => {
    // Database connection
    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log("Database connected..👍"))
        .catch(err => console.log(err))
    console.log(`server start http://localhost:${ports}`);
})