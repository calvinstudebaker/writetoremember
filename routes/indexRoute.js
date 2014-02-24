
/*
 * GET home page.
 */

 var data = require("../data/usersData.json");

exports.view = function(req, res){
  res.render('index');
};

exports.signIn = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var responseData = new Object();
	console.log(username);
	console.log(password);
	
	if(data.hasOwnProperty(username)){
		if(data[username].password == password){
			data.currentUser = username;
			responseData["status"] = "success";
  			req.session.username = username;

		}else{
			responseData["status"] = "failure";
		}
	}else{
		responseData["status"] = "failure";
	}
	
	res.json(responseData);
};