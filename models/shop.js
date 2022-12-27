const mongoose = require('mongoose')

const shopSchema = mongoose.Schema({
  shop_name: {
    type: String,
    required: true,
  },
  shop_description: {
    type: String,
    required: true,
  },
  shop_address: {
    type: String,
    required: true,
  },
  shop_owner_name: {
    type: String,
    required: true,
  },
  shop_image: {
    type: String,
    required: true,
  },
  shop_latitude: {
    type: Number,
    required: true,
  },
  shop_longitude: {
    type: Number,
    required: true,
  },
});

exports.Shop = mongoose.model('Shop', shopSchema)