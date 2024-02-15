const mongoose = require('mongoose');

const db = async () => {
  const mongoURI = 'mongodb://127.0.0.1:27017/leavedb';
  mongoose.connect(mongoURI);
};

module.exports = db;
