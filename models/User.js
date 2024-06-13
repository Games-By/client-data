const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
   name: String,
   description: String,
   image: String,
   platform: String,
   genre: String,
   releaseYear: Number,
   rating: Number
});

const PaymentMethodSchema = new mongoose.Schema({
   cardHolderName: String,
   cardNumber: String,
   expirationDate: String,
   cvv: String
});

const UserSchema = new mongoose.Schema({
   name: String,
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
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
