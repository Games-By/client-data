const User = require('../models/User');

module.exports = class WishListController {
   static async getWishList(req, res) {
      const { id } = req.params;
      console.log('id', id);
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
         const wishlist = user.wish_list
         res.status(200).json({ wishlist });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   }
   static async addToWishList(req, res) {
      const { userId, wishItem } = req.body;

      try {
         const user = await User.findById(userId);
         if (!user) {
            return res.status(404).json({ error: 'User not found' });
         }

         user.wish_list.push(wishItem);
         await user.save();

         res.status(200).json({
            message: 'Item added to wish list successfully',
            user,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   }

   static async removeFromWishList(req, res) {
      const { userId, itemId } = req.body;

      try {
         const user = await User.findById(userId);
         if (!user) {
            return res.status(404).json({ error: 'User not found' });
         }

         user.wish_list.pull(itemId);
         await user.save();

         res.status(200).json({
            message: 'Item removed from wish list successfully',
            user,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   }

   static async updateWishList(req, res) {
      const { userId, itemId, updatedItem } = req.body;

      try {
         const user = await User.findById(userId);
         if (!user) {
            return res.status(404).json({ error: 'User not found' });
         }

         const index = user.wish_list.findIndex(
            (item) => item && item._id && item._id.toString() === itemId
         );
         if (index === -1) {
            return res
               .status(404)
               .json({ error: 'Item not found in wish list' });
         }

         user.wish_list[index] = updatedItem;
         await user.save();

         res.status(200).json({
            message: 'Wish list item updated successfully',
            user,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   }
};
