var data = require("../data/usersData.json");

exports.view = function(req, res){
	res.render('createAccount');
};

exports.create = function(req, res){
	var username = req.body.username;
	var account = new Object();
	account.password = req.body.password;

	var responseData = new Object();
	
	if(data.hasOwnProperty(username)){
		responseData["status"] = "failure";
	}else{
		data[username] = account;
		data.currentUser = username;
		req.session.username = username;
		responseData["status"] = "success";
	}
	
	res.json(responseData);
};