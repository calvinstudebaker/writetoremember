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

exports.getRandomEntry = function(req, res) {
    var random_index = Math.floor((Math.random()*entries.length)+1);
    var random_entry = pastEntries['entries'][random_index];
    random_entry.status = "success";
    res.json(random_entry);
};