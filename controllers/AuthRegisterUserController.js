const User = require('../models/User');
const UploadImage = require('../models/UploadImage');
const bcrypt = require('bcrypt');

module.exports = class AuthRegisterUserController {
   static async init(req, res) {
      res.send({ message: 'Welcome' });
   }

   static async registerUser(req, res) {
      const {
         name,
         birth,
         email,
         password,
         confirmPassword,
         gender,
         customer_since,
         wish_list,
         buyed_games,
         payment_methods,
      } = req.body;

      const requiredFields = [
         'name',
         'birth',
         'email',
         'password',
         'confirmPassword',
         'gender',
      ];

      for (const field of requiredFields) {
         if (!req.body[field]) {
            return res
               .status(422)
               .json({ message: `The field '${field}' is required!` });
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

      let image = '';

      if (req.body.image) {
         image = req.body.image;
      }
      const user = new User({
         name,
         birth,
         email,
         image,
         password: passWordHash,
         gender,
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
   static async uploadImage(req, res) {
      if (!req.file) {
         return res.status(400).json({ message: 'No file uploaded' });
      }

      const uploadImage = new UploadImage({
         image: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
         },
      });

      try {
         await uploadImage.save();
         return res.status(201).json({
            message: 'Photo uploaded successfully!',
            image: uploadImage.image,
         });
      } catch (error) {
         return res.status(500).json({
            message: 'An error occurred while uploading the photo',
            error,
         });
      }
   }
};
