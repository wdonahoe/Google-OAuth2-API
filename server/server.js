var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var httpStatus = require('http-status');

var logger = require('./config/logger');

var app = express();
var port = Number(process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('combined', {
	stream: {
		write: function(message, encoding){
			logger.info(message);
		}
	}
}));

app.use('/', require('./routes'));


app.listen(port, function(){
	logger.info("Listening on port " + port);
});