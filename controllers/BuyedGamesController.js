const User = require('../models/User');

module.exports = class BuyedGamesController {
   static async addBuyedGame(req, res) {
      const { userId, newGame } = req.body;

      try {
         const user = await User.findById(userId);
         if (!user) {
            return res.status(404).json({ error: 'User not found' });
         }

         user.buyed_games.push(newGame);
         await user.save();

         res.status(200).json({
            message: 'Buyed game added successfully',
            user,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   }

   static async removeBuyedGame(req, res) {
      const { userId, gameId } = req.body;

      try {
         const user = await User.findById(userId);
         if (!user) {
            return res.status(404).json({ error: 'User not found' });
         }

         user.buyed_games.pull(gameId);
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

   static async updateBuyedGame(req, res) {
      const { userId, gameId, updatedGame } = req.body;

      try {
         const user = await User.findById(userId);
         if (!user) {
            return res.status(404).json({ error: 'User not found' });
         }

         const index = user.buyed_games.findIndex(
            (game) => game._id.toString() === gameId
         );
         if (index === -1) {
            return res
               .status(404)
               .json({ error: 'Game not found in buyed games list' });
         }

         user.buyed_games[index] = updatedGame;
         await user.save();

         res.status(200).json({
            message: 'Buyed game updated successfully',
            user,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
      }
   }
};
