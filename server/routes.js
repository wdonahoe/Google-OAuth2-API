var express 	= require('express');
var httpStatus 	= require('http-status');
var router 		= express.Router();

var routes = function(passport){

	router.route('/auth/google')
		.get(passport.authenticate('google', { scope: ['profile', 'email'] }));

	router.route('/auth/google/callback')
		.get(function(req, res, next){
			passport.authenticate('google', function(err, user){
				if (err) 
					return next(err);
				if (!user)
					return res.sendStatus(httpStatus[401]).end();
				req.login(user, function(err){
					if (err)
						return next(err);
					return next(null,user);
				});
			})(req, res, next);
		});

	return router;
}

function isLoggedIn(req, res, next){
	if (req.isAuthenticated())
		return next();

	res.sendStatus(httpStatus[401]).end();
}

module.exports = routes;