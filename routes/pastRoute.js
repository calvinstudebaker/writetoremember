var pastEntries = require("../data/pastData.json");


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