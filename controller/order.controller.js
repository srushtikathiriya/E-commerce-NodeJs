const Order = require("../model/order.model");
const Cart = require("../model/cart.model");
const cartServices = require("../services/cart.services");
const CartServices = new cartServices();
const OrderServices = require("../services/order.services");
const orderServices = new OrderServices();

exports.addNewOrder = async (req, res) => {
    try {

        let carts = await CartServices.getAllCart({
            user: req.user._id,
            isDelete: false,
        }).populate("productId");

        console.log(carts);

        let orderItems = carts.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
            totalAmount: item.quantity * item.productId.price,
        }));
        console.log("order", orderItems);

        let amount = orderItems.reduce((total, item) => (total += item.totalAmount), 0);

        let order = await orderServices.createOrder(req.user._id, orderItems, amount);

        await Cart.updateMany(
            {
                user: req.user._id,
                isDelete: false
            },
            { isDelete: true }
        );

        res.json({ message: "Order Placed", order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        let order = await orderServices.deleteOrder(req.body.OrderId, { isDelete: true });
        console.log(order);

        if (!order) return res.status(404).json({ message: 'Order not found...' });

        res.status(200).json({ message: 'Order deleted...', order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error...' });
    }
};
