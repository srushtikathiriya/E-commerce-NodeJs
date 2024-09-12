// const Order = require('../model/order.model');
// const Cart = require('../model/cart.model');


// exports.addNewOrder = async (req, res) => {
//     try {
//         // Check if req.user exists
//         if (!req.user ||  !req.user._id) {
//             return res.status(400).json({ message: "User not authenticated or missing ID." });
//         }

//         console.log("user==>", req.user);

//         // Fetch carts for the user
//         let carts = await Cart.find({
//             userId: req.user._id,
//             isDelete: false,
//         }).populate("productId");

//         console.log("cart====>", carts);

//         // If cart is empty
//         if (carts.length === 0) {
//             return res.status(400).json({ message: "Cart is empty" });
//         }

//         // Create order items from cart
//         let orderItems = carts.map((item) => {
//             if (!item.productId || !item.productId._id) {
//                 throw new Error('Cart item missing productId or productId._id');
//             }
//             return {
//                 productId: item.productId._id,
//                 quantity: item.quantity,
//                 price: item.productId.price,
//                 totalAmount: item.quantity * item.productId.price
//             };
//         });

//         // Calculate total price for all items
//         let amount = orderItems.reduce(
//             (total, item) => (total += item.totalAmount), 0
//         );

//         // Create a new order
//         let order = await Order.create({
//             userId: req.user._id,
//             item: orderItems,
//             totalPrice: amount
//         });
//         console.log("order", order);

//         // Mark cart items as deleted
//         await Cart.updateMany(
//             {
//                 userId: req.user._id,
//                 isDelete: false,
//             },
//             {
//                 isDelete: true
//             }
//         );

//         res.json({ message: "Order Placed", order });
//     } catch (error) {
//         console.log("Error placing order:", error.message);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// exports.cancelOrder = async (req, res) => {
//     try {
//         if (!req.user || !req.user._id) {
//             return res.status(400).json({ message: "User not authenticated or missing ID." });
//         }
//         const { orderId } = req.params;
//         let order = await Order.findOne({ _id: orderId, userId: req.user._id ,isDelete:true});
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         if (order.isDelete) {
//             return res.status(400).json({ message: 'Order already cancelled' });
//         }
//         // order.isDelete = true;
//         await order.save();
//         res.status(200).json({ message: 'Order cancelled successfully', order });
//     } catch (error) {
//         console.log('Error cancelling order:', error.message);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// exports.showAllOrder = async (req, res) => {
//     try {
//         // Check if req.user exists
//         if (!req.user || !req.user._id) {
//             return res.status(400).json({ message: "User not authenticated or missing ID." });
//         }

//         // Fetch all orders for the user that are not deleted
//         let orders = await Order.find({ userId: req.user._id, isDelete: false });

//         // If no orders found
//         if (orders.length === 0) {
//             return res.status(404).json({ message: 'No orders found' });
//         }

//         res.status(200).json({ orders });
//     } catch (error) {
//         console.log('Error fetching orders:', error.message);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };



const Order = require('../model/order.model')
const Cart = require('../model/cart.model');
  
exports.addNewOrder = async (req,res) => {
    try {
        const carts = await Cart.find({userId : req.user._id,isDeleted : false}).populate('productId');

        const orderItem = await carts.map((item)=>({
            productId : item.productId._id,
            quantity : item.quantity,
            price :  item.productId.price,
            totalPrice : item.quantity * item.productId.price, 
        }));

        const amount = orderItem.reduce((total,item)=>(total += item.totalAmount),0);

        const nweOrder = await Order.create({userId: req.user._id , items : orderItem ,  totalAmount : amount});

        await Cart.updateMany({userId : req.user._id , isDeleted : true});

        return res.status(201).json({message : 'Order Is add ' , nweOrder});

    } catch (error) {
        console.log('Error',error);
        res.status(500).json({message  : 'Internal Server Error'});        
    }
}

exports.deleteOrder = async (req,res) => {
    try {
        let order = await Order.findOne({ userId : req.user._id , isDeleted : false });        
        if(order.length === 0) return res.status(404).json({message : 'order Is Not Found...'});
        order = await Order.findByIdAndUpdate(order._id,{$set : {isDeleted : true }},{new : true});
        return res.status(200).json({message:'order Was Deleted',order});
    } catch (error) {
        console.log('Error',error);
        res.status(500).json({message  : 'Internal Server Error'});        
    }
}

exports.showAllOrder = async (req,res) => {
    try {
        let orders = await Order.find({userId : req.user._id, isDeleted : false});
        if(orders.length === 0) return res.status(404).json({message : 'orders Not Found'});
        return res.status(200).json({orders});
    } catch (error) {
        console.log('Error',error);
        res.status(500).json({message  : 'Internal Server Error'});        
    }
}
