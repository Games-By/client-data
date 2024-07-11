const User = require('../models/User');

module.exports = class CartController {
   static async getCart(req, res) {
      const { id } = req.params;
      let user = null;
      try {
         if (id) {
            user = await User.findById(id);

         } else {
            return res.status(400).json({ error: 'User missing from request' });
         }

         if (!user) {
            return res.status(404).json({ error: 'User not Found!' });
         }
         const cart = user.cart
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

         user.cart.pull(itemId);
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
            (item) => item && item._id && item._id.toString() === itemId
         );
         if (index === -1) {
            return res
               .status(404)
               .json({ error: 'Item not found in cart' });
         }

         user.cart[index] = updatedItem;
         await user.save();

         res.status(200).json({
            message: 'cart item updated successfully',
            user,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   }
};
