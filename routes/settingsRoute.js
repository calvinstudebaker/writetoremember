var settingsData = require("../data/settingsData.json");

exports.view = function(req, res){
  res.render('settings', settingsData);
};

exports.save = function(req, res){
	var rate = req.body.rate;
	settingsData.rate = rate;
	var response = new Object();
	response.status = "success";
	console.log(rate);
	res.json(response);
};