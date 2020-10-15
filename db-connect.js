const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose');

// Map global promise 
mongoose.Promise = global.Promise;

// Connect to db
const db = mongoose.connect(process.env.DB_CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports =  db;
