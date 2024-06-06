const express = require('express');
const cors = require('cors');
require('dotenv').config();

var app = express();
app.use(express.json());
app.use(cors());

const AuthRegisterUserRoutes = require('./routes/AuthRegisterUserRoutes')

app.use(AuthRegisterUserRoutes)
const port = process.env.PORT || 3001;

app.listen(port, () => {
   console.log(`Server running on the port ${port}`);
});

require('./database/connection');
