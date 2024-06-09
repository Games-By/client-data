const User = require('../models/User');

module.exports = class PaymentMethodsController {
   static async addPaymentMethod(req, res) {
      const { userId, newMethod } = req.body;

      try {
         const user = await User.findById(userId);
         if (!user) {
            return res.status(404).json({ error: 'User not found' });
         }

         user.payment_methods.push(newMethod);
         await user.save();

         res.status(200).json({
            message: 'Payment method added successfully',
            user,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   }

   static async updatePaymentMethod(req, res) {
      const { userId, methodId, updatedMethod } = req.body;

      try {
         const user = await User.findById(userId);
         if (!user) {
            return res.status(404).json({ error: 'User not found' });
         }

         const methodIndex = user.payment_methods.findIndex(
            (method) => method._id.toString() === methodId
         );
         if (methodIndex === -1) {
            return res.status(404).json({ error: 'Payment method not found' });
         }

         user.payment_methods[methodIndex] = updatedMethod;
         await user.save();

         res.status(200).json({
            message: 'Payment method updated successfully',
            user,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   }

   static async removePaymentMethod(req, res) {
      const { userId, methodId } = req.body;

      try {
         const user = await User.findById(userId);
         if (!user) {
            return res.status(404).json({ error: 'User not found' });
         }

         const methodIndex = user.payment_methods.findIndex(
            (method) => method._id.toString() === methodId
         );
         if (methodIndex === -1) {
            return res.status(404).json({ error: 'Payment method not found' });
         }

         user.payment_methods.splice(methodIndex, 1);
         await user.save();

         res.status(200).json({
            message: 'Payment method removed successfully',
            user,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   }
};
