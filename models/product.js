const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  superProduct_name:{
    type:String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_category: {
    type: String,
  },
  product_stock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
});

exports.Product = mongoose.model("Product", productSchema);
