const mongoose = require('mongoose');
require('dotenv').config();

const getDatabaseURL = () => {
   if (process.env.NODE_ENV === 'production') {
      return process.env.PROD_DB_URL;
   } else if (process.env.NODE_ENV === 'staging') {
      return process.env.STAGING_DB_URL;
   } else {
      return process.env.DEV_DB_URL;
   }
};

const dbConnect = getDatabaseURL();

if (!dbConnect) {
   console.error(
      'Database credentials are missing. Please check your .env file.'
   );
   process.exit(1);
}

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
