var models = require("../models");

exports.view = function(req, res){
	res.render('createAccount');
};
/**
exports.createAccount = function(req, res){
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
*/

exports.createAccount = function(req, res){
  //we need to search database for someone with that username, set response.status = "failure" if so, "success" if not
  var response = new Object();
  models.User
  	.findOne({"username":req.body.username})
  	.exec(afterCreateAccount);

	function afterCreateAccount(err, projects) {
		console.log(projects);
	  	if(projects!=null) {
	  		response.status = "failure";
	  		res.json(response);
	  		res.send(response);
	 	 } else {
	  	  response.status = "success"
	  	  req.session.username = req.body.username;
		  var newUser = new models.User({
		    	"username" :req.body.username,
		   		"password" :req.body.password,
		    	"frequency" : "daily",
		   	 	"time" : 1230,
		  });
		  newUser.save(afterSaving);

		  function afterSaving(err) { // this is a callback
			    if(err) {console.log(err); res.send(500);}
			    //var result = new Object();
			    response.status = "success";
			    res.json(response);
			    res.send(response);
		   }
		  //var newEntry = req.body;
		  //pastEntries['entries'].unshift(newEntry);
		}
		res.json(response);
		res.send(response);
	 }
	  
};