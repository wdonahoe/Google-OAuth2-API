var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var UserSchema = Schema({
	facebook: {
		name: String,
		email: String,
		id: String,
		token: String
	},
	google: {
		name: String,
		email: String,
		id: String,
		token: String
	}
});

module.exports = mongoose.model('User', UserSchema);
