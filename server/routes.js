var express 	= require('express');
var httpStatus 	= require('http-status');
var user 		= require('./controllers/user');
var session 	= require('./controllers/session');

module.exports = function(passport){
	var router = express.Router();

	router.route('/session')
		.post(session.create)
		.delete(session.destroy);

	router.route('/auth/google')
		.get(passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

	router.route('/auth/google/callback')
		.get(passport.authenticate('google', function(req, res){
			if (err) 
				return next(err);
			if (!user)
				return res.sendStatus(httpStatus[401]).end();
			req.logIn(user, function(err){
				if (err)
					return next(err);
				// FINISH
			});
		}))

};

function isLoggedIn(req, res, next){
	if (req.isAuthenticated())
		return next();

	res.sendStatus(httpStatus[401]).end();
}