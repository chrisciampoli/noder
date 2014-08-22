var crypto = require('crypto');
var express = require('express');
module.exports = function(app) {
	// Controllers for various routes
	var users = require('./controllers/users_controller');
	var locations = require('./controllers/locations_controller');
	var shifts = require('./controllers/shifts_controller');

	app.use('/static', express.static('./static'))
	.use('/lib', express.static('./lib'))
	.use('/bower', express.static('./bower_components'));

	app.get('/', function(req, res) {
		if(req.session.user) {
			res.render('index', {
				username: req.session.username,
				msg: req.session.msg
			});
		} else {
			req.session.msg = 'Access denied!';
			res.redirect('/login');
		}
	});

	app.get('/user', function(req, res) {
		if(req.session.user) {
			res.render('user', {
				msg: req.session.msg
			});
		} else {
			req.session.msg = 'Access denied!';
			res.redirect('/login');
		}
	});

	app.get('/signup', function(req, res) {
		if(req.session.user) {
			res.redirect('/');
		} else {
			res.render('signup', {
				msg: req.session.msg
			});
		}
	});

	app.get('/login', function(req, res) {
		if(req.session.user) {
			res.redirect('/');
		}
		res.render('login', {
			msg: req.session.msg
		});
	});

	app.get('/logout', function(req, res) {
		req.session.destroy(function() {
			res.redirect('/login');
		});
	});

	app.post('/signup', users.signup);
	app.post('/user/update', users.updateUser);
	app.post('/user/delete', users.deleteUser);
	app.post('/login', users.login);
	app.get('/user/profile', users.getUserProfile);

	// Routes for locations
	app.post('/locations/create', locations.createLocation);
	app.get('/locations/getLocations', locations.getLocations);
	app.post('/locations/update', locations.updateLocation);
	app.post('/locations/delete', locations.deleteLocation);
	//app.get('/locations/location', locations.getLocation);
	app.get('/locations', function(req, res) {
		if(req.session.user) {
			res.render('locations', {
				msg: req.session.msg
			});
		} else {
			req.session.msg = 'Access denied!';
			res.redirect('/login');
		}
	});


	// Routes for Shifts
	app.post('/shifts/create', shifts.createShift);
	app.get('/shifts/getShifts', shifts.getShifts);
	//app.post('/shifts/update', shifts.updateShift);
	//app.post('/shifts/delete', shifts.deleteShift);
	app.get('/shifts', function(req, res) {
		if(req.session.user) {
			res.render('shifts', {
				msg: req.session.msg
			});
		} else {
			req.session.msg = 'Access denied!';
			res.redirect('/login');
		}
	});
};