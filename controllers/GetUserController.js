const User = require('../models/User');

module.exports = class GetUserController {
   static async getUser(req, res) {
      const { email } = req.query;

      let user = null;
      try {
         if (email) {
            user = await User.findOne({ email: email });
         } else {
            return res.status(400).json({ error: "Email missing from request" });
         }

         if (!user) {
            return res.status(404).json({ error: "User not Found!" });
         }

         res.status(200).json({ user });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Internal server error" });
      }
   }
};
