var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session');

var mongoStore = require('connect-mongo')({
	session: expressSession
});

var mongoose = require('mongoose');
require('./models/users_model.js');
require('./models/locations_model.js');
require('./models/shifts_model.js');

var conn = mongoose.connect('mongodb://localhost/myapp');

var app = express();

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({
	secret: 'SECRET',
	cookie: {marxAge: 60*60*1000},
	store: new mongoStore({
		db: mongoose.connection.db,
		collection: 'sessions'
	})
}));
require('./routes')(app);
app.listen(80);