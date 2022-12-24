const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    role:String
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

// exports.User = mongoose.model('User', userSchema);
// exports.userSchema = userSchema;

mongoose.model('users',userSchema)

module.exports = mongoose.model('users')
