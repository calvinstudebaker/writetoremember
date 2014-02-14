var data = require("../data/usersData.json");

exports.view = function(req, res){
	res.render('createAccount');
};

exports.create = function(req, res){
	var email = req.body.email;
	var account = new Object();
	account.password = req.body.password;

	var responseData = new Object();
	
	if(data.hasOwnProperty(email)){
		responseData["status"] = "failure";
	}else{
		data[email] = account;
		data.currentUser = email;
		responseData["status"] = "success";
	}
	
	res.json(responseData);
};