const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = process.env.NODE_ENV === 'production' ? process.env.PROD_DB_URL : process.env.DEV_DB_URL;

const prodDBUrl = process.env.PROD_DB_URL;
// const stagingDBUrl = process.env.STAGING_DB_URL;
const devDBUrl = process.env.DEV_DB_URL;

if (!prodDBUrl || !devDBUrl) {
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
