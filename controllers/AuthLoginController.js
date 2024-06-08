const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const imageToBase64 = require('image-to-base64');

module.exports = class AuthLoginController {
   static async login(req, res) {
      const { email, password } = req.body;

      if (!email) {
         return res
            .status(422)
            .json({ message: 'Fields were not filled in correctly: E-mail' });
      }
      if (!password) {
         return res
            .status(422)
            .json({ message: 'Fields were not filled in correctly: password' });
      }
      let user = null;
      try {
         user = await User.findOne({ email: email });
      } catch (error) {
         console.error(error);
         res.send('error', error);
      }

      if (!user) {
         return res.status(404).json({ message: 'User not found!' });
      }

      const checkPassaword = await bcrypt.compare(password, user.password);

      if (!checkPassaword) {
         return res
            .status(422)
            .json({ message: 'the password sent is invalid!' });
      }

      try {
         const secret = process.env.SECRET;
         const token = jwt.sign({ id: user._id }, secret);
         res.status(200).json({
            message: 'user successfully authenticated!',
            token,
         });
      } catch (error) {
         console.error(error);
         res.status(500).json({ message: 'error authenticating user' });
      }
   }

   static async downloadImage(req, res) {
      const { imageName } = req.query;
      imageToBase64(`./uploads/${imageName}`)
         .then((response) => {
            res.send({ image: response });
         })
         .catch((err) => {
            console.error(err);
         });
   }
};
