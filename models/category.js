const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    category_name: {
        type: String,
        required: true,
    },
})

exports.Category = mongoose.model('Category', categorySchema);
