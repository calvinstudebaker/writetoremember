exports.view = function(req, res){
	if (!req.session.username) {
  	res.render('index');
  } else {
  	res.render('instructions');
  }
};
