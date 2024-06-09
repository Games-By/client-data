const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const AuthRegisterUserRoutes = require('./routes/AuthRegisterUserRoutes');
const AuthLoginController = require('./routes/AuthLoginRoutes');
const GetUserController = require('./routes/GetUserRoutes');
const WishListRoutes = require('./routes/WishListRoutes'); // Adicione esta linha

app.use(AuthRegisterUserRoutes);
app.use(AuthLoginController);
app.use(GetUserController);
app.use(WishListRoutes); // Adicione esta linha

const port = process.env.PORT || 3001;

app.listen(port, () => {
   console.log(`Server running on the port ${port}`);
});

require('./database/connection');
