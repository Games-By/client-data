const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = process.env.NODE_ENV === 'production' ? process.env.PROD_DB_URL : process.env.DEV_DB_URL;

if (!dbConnect) {
   console.error(
      'Database credentials are missing. Please check your .env file.', dbConnect
   );
   process.exit(1);
}

console.log(process.env.NODE_ENV)

const connect = () => {
   mongoose.connect(`${dbConnect}`);
   const connection = mongoose.connection;
   connection.on('error', (err) => {
      console.error('Error connecting to database', err);
   });
   connection.on('open', () => {
      console.log('MongoDB connected!');
   });
};

connect();

module.exports = mongoose;
