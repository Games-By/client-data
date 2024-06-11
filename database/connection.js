const mongoose = require('mongoose');
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

if (!dbUser || !dbPassword) {
   console.error('Database credentials are missing. Please check your .env file.');
   process.exit(1);
}

const connect = async () => {
   try {
      await mongoose.connect(
         `mongodb+srv://${dbUser}:${dbPassword}@client-data.eqkqrqx.mongodb.net/client-data`,
         {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, 
         }
      );

      console.log('database connected!');
   } catch (err) {
      console.error('Error connecting to database', err);
      process.exit(1);
   }

   const connection = mongoose.connection;
   connection.on('error', (err) => {
      console.error('Error in MongoDB connection:', err);
   });
};

connect();

module.exports = mongoose;
