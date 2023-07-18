const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    validate: {
      validator: function (value) {
        return ["Dangote", "Bua", "Lafarge"].includes(value);
      },
      message: (props) => `${props.value} is not a valid company`,
    },
    required: true,
  },
});
module.exports = mongoose.model("Product", productSchema);
