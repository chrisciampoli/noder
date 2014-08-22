var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var ShiftSchema = new Schema({
	name: String,
	start: String,
	end: String
});

mongoose.model('Shift', ShiftSchema);