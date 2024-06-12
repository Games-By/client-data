const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:3000' }));
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
