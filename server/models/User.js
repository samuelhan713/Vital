const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;