var data = require("../data/usersData");

exports.view = function(req, res){
  res.render('home', data);
};