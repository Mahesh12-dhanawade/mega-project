const mongoose = require("mongoose");

// Defining Schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  tc: { type: Boolean, required: true },
});

// Model
exports.UserModel = mongoose.model("User", userSchema);
