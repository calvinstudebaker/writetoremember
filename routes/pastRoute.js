exports.view = function(req, res){
  res.render('past', {
  	{
  		'date': 'Feb 4th',
  		'content': 'I talked to Peter about death.'
  	},

  });
};