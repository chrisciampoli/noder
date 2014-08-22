var crypto = require('crypto');
var mongoose = require('mongoose'),
	Shift = mongoose.model('Shift');

exports.createShift = function(req, res) {

	var shift = new Shift({
		name: req.body.shiftName
	});
	
	shift.set('start', req.body.shiftStart);
	shift.set('end', req.body.shiftEnd);
	
	shift.save(function(err) {
		if(err) {
			res.session.error = err;
			res.redirect('/shifts');
		} else {
			req.session.msg = 'Shift created successfully';
			res.redirect('/shifts');
		}
	});
};

exports.getShifts = function(req, res) {
	Shift.find().exec(function(err, shifts) {
		if(!shifts) {
			res.json(404, {
				err: 'No shifts found.'
			});
		} else {
			res.json(shifts);
		}
	});
};


