const User = require('../models/User');

module.exports = class CartController {
   static async getCart(req, res) {
      const { id } = req.params;
      try {
         if (!id) {
            return res.status(400).json({ error: 'User missing from request' });
         }

         const user = await User.findById(id);
         if (!user) {
            return res.status(404).json({ error: 'User not found' });
         }

         const cart = user.cart;
         res.status(200).json({ cart });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   }

   static async addToCart(req, res) {
      const { userId, cartItem } = req.body;
      try {
         const user = await User.findById(userId);
         if (!user) {
            return res.status(404).json({ error: 'User not found' });
         }

         user.cart.push(cartItem);
         await user.save();

         res.status(200).json({
            message: 'Item added to cart successfully',
            user,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   }

   static async removeFromCart(req, res) {
      const { userId, itemId } = req.body;
      try {
         const user = await User.findById(userId);
         if (!user) {
            return res.status(404).json({ error: 'User not found' });
         }

         user.cart = user.cart.filter((item) => item._id.toString() !== itemId);
         await user.save();

         res.status(200).json({
            message: 'Item removed from cart successfully',
            user,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   }

   static async updateCart(req, res) {
      const { userId, itemId, updatedItem } = req.body;
      try {
         const user = await User.findById(userId);
         if (!user) {
            return res.status(404).json({ error: 'User not found' });
         }

         const index = user.cart.findIndex(
            (item) => item._id.toString() === itemId
         );
         if (index === -1) {
            return res.status(404).json({ error: 'Item not found in cart' });
         }

         user.cart[index] = updatedItem;
         await user.save();

         res.status(200).json({
            message: 'Cart item updated successfully',
            user,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   }
};
