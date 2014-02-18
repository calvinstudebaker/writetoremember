var pastEntries = require("../data/pastData.json");
var helpers = require('diy-handlebars-helpers');
var hbs = require('handlebars-runtime');
var _   = require('lodash');


exports.view = function(req, res){
  res.render('past', pastEntries);
};

exports.addEntry = function(req, res){
	var newEntry = req.body;
	pastEntries['entries'].push(newEntry);
	var response = new Object();
	response.status = "success";
	res.json(response);

};