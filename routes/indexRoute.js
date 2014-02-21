
/*
 * GET home page.
 */

 var data = require("../data/usersData.json");

exports.view = function(req, res){
  res.render('index');
};

exports.signIn = function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	var responseData = new Object();
	console.log(email);
	console.log(password);
	
	if(data.hasOwnProperty(email)){
		if(data[email].password == password){
			data.currentUser = email;
			responseData["status"] = "success";
  			req.session.username = email;

		}else{
			responseData["status"] = "failure";
		}
	}else{
		responseData["status"] = "failure";
	}
	
	res.json(responseData);
};