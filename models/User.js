const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema(
   {
      'en-US': {
         currencyCode: String,
         amount: Number,
      },
      'pt-BR': {
         currencyCode: String,
         amount: Number,
      },
      'es-ES': {
         currencyCode: String,
         amount: Number,
      },
   },
   { _id: false }
);

const CartSchema = new mongoose.Schema({
   name: String,
   description: {
      'en-US': String,
      'pt-BR': String,
      'es-ES': String,
   },
   image: String,
   platform: String,
   genres: {
      'en-US': String,
      'pt-BR': String,
      'es-ES': String,
   },
   releaseYear: Number,
   rating: Number,
   prices: [PriceSchema],
});

const PaymentMethodSchema = new mongoose.Schema({
   cardHolderName: String,
   cardNumber: String,
   expirationDate: String,
   cvv: String,
});

const WishSchema = new mongoose.Schema({
   name: String,
   description: {
      'en-US': String,
      'pt-BR': String,
      'es-ES': String,
   },
   image: String,
   platform: String,
   genres: {
      'en-US': String,
      'pt-BR': String,
      'es-ES': String,
   },
   releaseYear: Number,
   rating: Number,
});

const UserSchema = new mongoose.Schema({
   name: String,
   username: String,
   image: String,
   birth: String,
   userID: String,
   email: String,
   password: String,
   gender: String,
   customer_since: String,
   geolocation: String,
   wish_list: [WishSchema],
   buyed_games: [WishSchema],
   payment_methods: [PaymentMethodSchema],
   cart: [CartSchema],
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
