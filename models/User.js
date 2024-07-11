const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
   name: String,
   description: {
      en: String,
      pt: String,
      zh: String,
      es: String,
      hi: String,
      fr: String,
      ar: String,
      bn: String,
      ru: String,
      id: String,
   },
   image: String,
   platform: String,
   genres: {
      en: String,
      pt: String,
      zh: String,
      es: String,
      hi: String,
      fr: String,
      ar: String,
      bn: String,
      ru: String,
      id: String,
   },
   releaseYear: Number,
   rating: Number
});

const CartSchema = new mongoose.Schema({
   name: String,
   description: {
      en: String,
      pt: String,
      zh: String,
      es: String,
      hi: String,
      fr: String,
      ar: String,
      bn: String,
      ru: String,
      id: String,
   },
   image: String,
   platform: String,
   genres: {
      en: String,
      pt: String,
      zh: String,
      es: String,
      hi: String,
      fr: String,
      ar: String,
      bn: String,
      ru: String,
      id: String,
   },
   releaseYear: Number,
   rating: Number,
   prices: PriceSchema
})

const PriceSchema = new Schema(
   {
      currencyCode: String,
      amount: Number,
   },
   { _id: false }
);

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
   cart: [CartSchema],
});

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;
