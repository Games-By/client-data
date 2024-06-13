const User = require('../models/User');
const UploadImage = require('../models/UploadImage');
const bcrypt = require('bcrypt');

function validateEmail(email, confirmEmail) {
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   if (!email || !confirmEmail) {
      return {
         status: 422,
         message: 'Email and confirm email fields cannot be empty',
      };
   }

   if (email !== confirmEmail) {
      return {
         status: 422,
         message: 'The email addresses are different',
      };
   }

   if (!emailRegex.test(email)) {
      return {
         status: 422,
         message: 'Invalid email format',
      };
   }

   if (email.length > 254) {
      return {
         status: 422,
         message: 'Email address is too long',
      };
   }

   const spamDomains = ['spam.com', 'fakeemail.com'];
   const emailDomain = email.split('@')[1];
   if (spamDomains.includes(emailDomain)) {
      return {
         status: 422,
         message: 'Email domain is not allowed',
      };
   }

   return {
      status: 200,
      message: 'Email is valid',
   };
}
function validatePassword(password, confirmPassword) {
   const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

   if (!password || !confirmPassword) {
      return {
         status: 422,
         message: 'Password and confirm password fields cannot be empty',
      };
   }

   if (password !== confirmPassword) {
      return {
         status: 422,
         message: 'The passwords are different',
      };
   }

   if (!passwordRegex.test(password)) {
      return {
         status: 422,
         message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be at least 8 characters long',
      };
   }

   return { status: 200, message: 'Password is valid' };
}
function validateBirth(birth) {
   const birthRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

   if (!birth) {
      return {
         status: 422,
         message: 'Birth date field cannot be empty',
      };
   }

   if (!birthRegex.test(birth)) {
      return {
         status: 422,
         message: 'Invalid birth date format, should be DD/MM/YYYY',
      };
   }

   const birthDate = moment(birth, 'DD/MM/YYYY');
   const currentDate = moment();
   const age = currentDate.diff(birthDate, 'years');

   if (age < 13) {
      return {
         status: 422,
         message: 'User must be at least 13 years old',
      };
   }

   return { status: 200, message: 'Birth date is valid' };
}
function validateUserID(userID) {
   const cleanedUserID = userID.replace(/[^\d]/g, '');

   function validateCPF(cpf) {
      if (!cpf || cpf.length !== 11) {
         return false;
      }

      let sum = 0;
      for (let i = 0; i < 9; i++) {
         sum += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let remainder = 11 - (sum % 11);
      if (remainder === 10 || remainder === 11) {
         remainder = 0;
      }
      if (remainder !== parseInt(cpf.charAt(9))) {
         return false;
      }

      sum = 0;
      for (let i = 0; i < 10; i++) {
         sum += parseInt(cpf.charAt(i)) * (11 - i);
      }
      remainder = 11 - (sum % 11);
      if (remainder === 10 || remainder === 11) {
         remainder = 0;
      }
      if (remainder !== parseInt(cpf.charAt(10))) {
         return false;
      }

      return true;
   }

   function validatePassport(passport) {
      return /^\d{6,}$/.test(passport);
   }

   if (validateCPF(cleanedUserID) || validatePassport(cleanedUserID)) {
      return { status: 200, message: 'UserID is valid' };
   } else {
      return { status: 422, message: 'Invalid UserID format' };
   }
}

function validateFields(data) {
   const { userID, birth, email, confirmEmail, password, confirmPassword } =
      data;

   const emailResult = validateEmail(email, confirmEmail);
   if (emailResult.status !== 200) {
      return emailResult;
   }

   const passwordResult = validatePassword(password, confirmPassword);
   if (passwordResult.status !== 200) {
      return passwordResult;
   }

   const birthResult = validateBirth(birth);
   if (birthResult.status !== 200) {
      return birthResult;
   }

   const userIDResult = validateUserID(userID);
   if (userIDResult.status !== 200) {
      return res
         .status(userIDResult.status)
         .json({ message: userIDResult.message });
   }

   return { status: 200, message: 'All fields are valid' };
}
module.exports = class AuthRegisterUserController {
   static async init(req, res) {
      res.send({ message: 'Welcome' });
   }

   static async registerUser(req, res) {
      const {
         name,
         birth,
         userID,
         email,
         confirmEmail,
         password,
         confirmPassword,
         gender,
         customer_since,
         geolocation,
      } = req.body;

      const requiredFields = [
         'name',
         'userID',
         'birth',
         'email',
         'confirmEmail',
         'password',
         'confirmPassword',
         'gender',
      ];

      for (const field of requiredFields) {
         if (!req.body[field]) {
            return res
               .status(422)
               .json({ message: `The field '${field}' is required!` }, field);
         }
      }

      const validation = validateFields({
         name,
         userID,
         birth,
         email,
         confirmEmail,
         password,
         confirmPassword,
         gender,
      });
      if (validation.status !== 200) {
         return res
            .status(validation.status)
            .json({ message: validation.message });
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
         userID,
         email,
         image,
         password: passWordHash,
         gender,
         customer_since,
         geolocation,
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
            name: req.file.originalname,
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
