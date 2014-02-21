var pastEntries = require("../data/pastData.json");

exports.view = function(req, res){
  if (!req.session.username) {
  	res.render('index');
  } else {
    res.render('past', pastEntries);
  }
};

exports.addEntry = function(req, res){
	var newEntry = req.body;
	pastEntries['entries'].unshift(newEntry);
	var response = new Object();
	response.status = "success";
	res.json(response);
};