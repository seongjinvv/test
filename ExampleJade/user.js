var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  user_key: String,
  data: Object,
});

module.exports = mongoose.model('User', userSchema);
