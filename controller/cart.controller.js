const CartService = require('../services/cart.services');
const cartService = new CartService();

exports.addToCart = async (req, res) => {
    try {
        let userId = req.user._id;
        let cart = await cartService.getCart({ user: userId, productId: req.body.productId, isDelete: false });

        if (cart) {
            return res.status(400).json({ message: "Already Exists..." });
        }

        cart = await cartService.addToCart({ user: userId, ...req.body });
        return res.status(201).json({ message: "Cart Added Success", cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.updateToCart = async (req, res) => {
    try {
        let cart = await cartService.updateCartQuantity(req.query.cartId, req.query.quantity);
        
        if (!cart.nModified) {
            return res.status(404).json({ message: 'Cart not found or not updated...' });
        }

        res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        let cart = await cartService.deleteCart(req.body.cartId);

        if (!cart.nModified) {
            return res.status(404).json({ message: 'Cart not found or not deleted...' });
        }

        res.status(200).json({ message: 'Cart deleted successfully', cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAllCarts = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const carts = await cartService.getAllCarts(req.user._id);

        if (!carts.length) {
            return res.status(404).json({ message: 'No carts found...' });
        }

        res.status(200).json(carts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
