var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	address: String,
	contact: String,
	phone: String
});

mongoose.model('Location', UserSchema);