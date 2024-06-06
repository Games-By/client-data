const mongoose = require('mongoose');
require('dotenv').config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const connect = () => {
   mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@client-data.eqkqrqx.mongodb.net/`
   );
   const connection = mongoose.connection;
   connection.on('error', (err) => {
      console.error('error connecting to database', err);
   });
   connection.on('open', () => {
      console.log('database connected!');
   });
};

connect();

module.exports = mongoose;
