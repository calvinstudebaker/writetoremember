
/*
 * GET home page.
 */

 //var data = require("../data/usersData.json");
 var models = require("../models");

exports.view = function(req, res){
  res.render('index');
};


exports.signIn = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	var response = new Object();
	models.User
		.findOne({"username": username, "password": password})
		.exec(afterSignIn);

	function afterSignIn(err, project) {
		console.log("project is " + project);
		if (project==null || project == []) {//check this! some .isempty?
			response.status = "failure";
		} else {
			response.status = "success";
			req.session.username = username;
		}
		res.json(response);
	}
};