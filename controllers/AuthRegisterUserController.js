const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = class AuthRegisterUserController {
   static async init(req, res) {
      res.send({ message: 'Welcome' });
   }

   static async registerUser(req, res) {
      const { name, birth, email, password, confirmPassword, customer_since, wish_list, buyed_games, payment_methods} = req.body;

      const requiredFields = [
         'name',
         'birth',
         'email',
         'password',
         'confirmPassword',
      ];

      for (const field of requiredFields) {
         if (!req.body[field]) {
            return res.status(422).json({ message: `${field} is required!` });
         }
      }
      if (password !== confirmPassword) {
         return res
            .status(422)
            .json({ message: `the passwords are different` });
      }

      const userExists = await User.findOne({ email: email });
      if (userExists) {
         return res
            .status(422)
            .json({ message: `This e-mail has already been registered` });
      }

      const hash = await bcrypt.genSalt(12);
      const passWordHash = await bcrypt.hash(password, hash);

      const user = new User({
         name,
         birth,
         email,
         password: passWordHash,
         confirmPassword,
         customer_since,
         wish_list,
         buyed_games,
         payment_methods,
      });

      try {
         await user.save();
         res.status(201).json({
            message: `user successfully registered!`,
            user,
         });
      } catch (error) {
         res.status(500).json({
            message: `error registering usererror registering user, please try again later`,
            error,
         });
      }
   }
};
