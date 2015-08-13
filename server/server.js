var express 		= require('express');
var morgan 			= require('morgan');
var bodyParser 		= require('body-parser');
var cookieParser 	= require('cookie-parser');
var session 		= require('express-session');
var httpStatus 		= require('http-status');
var mongoose 		= require('mongoose');
var passport  		= require('passport');

var logger 			= require('./config/logger');
var config 			= require('./config/config');

var app 			= express();
var port 			= process.env.PORT || 3000

app.use(morgan('combined', {
	stream: {
		write: function(message, encoding){
			logger.info(message);
		}
	}
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.mongo.url);
var db = mongoose.connection;
db.once('open', function(open){
	logger.info("connected to " + db.name + ' at ' + db.host + ' on port ' + db.port);
});
db.on('error', function(err){
	logger.error(err);
});

require('./config/passport')(passport);
app.use(session({ secret: config.secret, saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req,res){
	res.sendFile('./index.html', { root: '../client' });
});
app.use('/api', require('./routes')(passport));
app.use('*', function(req, res){
	res.sendStatus(httpStatus[404]).end();
});

app.listen(port, function(){
	logger.info("Listening on port " + port);
});