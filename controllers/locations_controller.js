var crypto = require('crypto');
var mongoose = require('mongoose'),
	Location = mongoose.model('Location');

exports.createLocation = function(req, res) {

	var location = new Location({
		name: req.body.locationName
	});
	
	location.set('address', req.body.locationAddress);
	location.set('contact', req.body.locationContact);
	location.set('phone', req.body.locationPhone);
	location.save(function(err) {
		if(err) {
			res.session.error = err;
			res.redirect('/locations');
		} else {
			req.session.msg = 'Location created successfully';
			res.redirect('/locations');
		}
	});
};

exports.getLocations = function(req, res) {
	Location.find().exec(function(err, locations) {
		if(!locations) {
			res.json(404, {
				err: 'No locations found.'
			});
		} else {
			res.json(locations);
		}
	});
};

exports.deleteLocation = function(req, res) {
	Location.findOne({
		_id: req.body._id
	}).exec(function(err, location) {
		if(location) {
			location.remove(function(err) {
				if(err) {
					req.session.msg = err;
				}
				req.session.msg = "Location deleted!";
				res.redirect('/locations');
			});
		} else {
			req.session.msg = "Location Not Found!";
			res.redirect('/locations');
		}
	});
};

