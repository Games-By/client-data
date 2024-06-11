const mongoose = require('mongoose');
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

if (!dbUser || !dbPassword) {
   console.error('Database credentials are missing. Please check your .env file.');
   process.exit(1);
}

const connect = () => {
   mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@client-data.eqkqrqx.mongodb.net/?retryWrites=true&w=majority&appName=client-data`
   );
   const connection = mongoose.connection;
   connection.on('error', (err) => {
      console.error('Erro ao conectar ao banco de dados', err);
   });
   connection.on('open', () => {
      console.log('Banco de dados conectado!');
   });
};

connect();

module.exports = mongoose;
