const mongoose = require('mongoose');

// Define the structure of a User
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], default: 'student' }
});

module.exports = mongoose.model('User', UserSchema);