//var data = require("../data/usersData");
var models = require("../models");

exports.view = function(req, res){
	//var data;
   if (!req.session.username) {
  	   res.render('index');
   } else {
  		res.render('home');
   }
}
