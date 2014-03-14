var settingsData = require("../data/settingsData.json");
var models = require('../models');

exports.view = function(req, res){
  if (!req.session.username) {
  	res.render('index');
  } else {
  	models.User
      .findOne({"username":req.session.username})
      .exec(renderSettings);

    function renderSettings(err, user){
    	console.log(user);
    	res.render('settings', user);
    }
  }
};

exports.save = function(req, res){
	var rate = req.body.rate;
  var key = req.body.pushKey;

  models.User
    .update({"username":req.session.username}, 
    { $set: { "pushCode" : key, "frequency" : rate } })
    .exec(afterSave);


  function afterSave(err, user){
    if(err) {console.log(err); res.send(500);}
    var response = new Object();
    response.status = "success";
    res.json(response);
  }
};