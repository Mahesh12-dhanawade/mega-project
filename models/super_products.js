const mongoose = require("mongoose");

const superProductsSchema = mongoose.Schema({
  superProduct_name: {
    type: String,
    required: true,
  },
  category_name: {
    type: String,
    required: true,
  },
});

exports.superProduct = mongoose.model("SuperProduct", superProductsSchema);