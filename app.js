const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');

const app = express();
app.use(express.json());

app.use(
   cors({
      origin: function (origin, callback) {
         if (origin === 'http://localhost:3000' || '*') {
            callback(null, true);
         } else {
            callback(new Error('Not allowed by CORS'));
         }
      },
      methods: ['GET', 'POST'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
   })
);
app.use(morgan('combined'));

const AuthRegisterUserRoutes = require('./routes/AuthRegisterUserRoutes');
const AuthLoginRoutes = require('./routes/AuthLoginRoutes');
const GetUserRoutes = require('./routes/GetUserRoutes');
const WishListRoutes = require('./routes/WishListRoutes');
const BuyedGamesRoutes = require('./routes/BuyedGamesRoutes');
const PaymentMethodsRoutes = require('./routes/PaymentMethodsRoutes');

app.use(AuthRegisterUserRoutes);
app.use(AuthLoginRoutes);
app.use(GetUserRoutes);
app.use(WishListRoutes);
app.use(BuyedGamesRoutes);
app.use(PaymentMethodsRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
   console.log(`Server running on the port ${port}`);
});

require('./database/connection');
