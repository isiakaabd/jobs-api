const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose.connect(process.env.Connection_String);
};
module.exports = { connectDB };
