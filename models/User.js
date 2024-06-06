const { Binary } = require('mongodb');
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
const PaymentMethods = new mongoose.Schema({
   cardHolderName: String,
   cardNumber: String,
   expirationDate: String,
   cvv: String
});
const User = mongoose.model('User', {
   name: String,
   birth: String,
   email: String,
   password: String,
   customer_since: String,
   wish_list: [WishSchema],
   buyed_games: [WishSchema],
   payment_methods: [PaymentMethods],
});

module.exports = User;
