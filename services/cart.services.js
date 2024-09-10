const Cart = require('../model/cart.model');
class CartServices {

        async addToCart(body) {
                return await Cart.create(body);
            }
        
            async getCart(query) {
                return await Cart.findOne(query);
            }
        
            async updateCartQuantity(cartId, quantity) {
                return await Cart.updateOne({ _id: cartId }, { $inc: { quantity: +quantity } }, { new: true });
            }
        
            async deleteCart(cartId) {
                return await Cart.updateOne({ _id: cartId }, { $set: { isDelete: true } }, { new: true });
            }
        
            async getAllCarts(userId) {
                return await Cart.find({ user: userId, isDelete: false });
            }
}

module.exports = CartServices;