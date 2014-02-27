
var Mongoose = require('mongoose');

var UserSchema = new Mongoose.Schema({
        "username": String,
		"password": String,
		"frequency" : String, //options are "daily" "weekly" "monthly"
		"time" : Number//four-digit military time, so 6:30 pm would map to 1830 and 6:30 am would be 0630
});

var EntrySchema = new Mongoose.Schema({
		"user_id" : String,//this is just username
        "text": String,
		"date": String,
		"image": String,
});

exports.User = Mongoose.model('User', UserSchema);
exports.Entry = Mongoose.model('Entry', EntrySchema);
