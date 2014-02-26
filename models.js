
var Mongoose = require('mongoose');

var UserSchema = new Mongoose.Schema({
        "username": String,
		"password": String,
});

var EntrySchema = new Mongoose.Schema({
		"user_id" : String,
        "text": String,
		"date": String,
		"image": String,
});

exports.User = Mongoose.model('User', UserSchema);
exports.Entry = Mongoose.model('Entry', EntrySchema);
