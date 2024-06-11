const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = process.env.DB_CONNECT;

if (!dbConnect) {
   console.error('Database credentials are missing. Please check your .env file.');
   process.exit(1);
}

const connect = () => {
   mongoose.connect(
      `${dbConnect}`
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
