exports.view = function(req, res){

  res.render('past', {'entries' : [
  	{
  		'date': 'Feb 4th',
  		'content': 'I saw Cathy for the first time in 3 years today!'
  	},
  	{
  		'date': 'Feb 5th',
  		'content': 'Skipped class for the first time ever.'	
  	},
  	{
  		'date': 'Feb 6th',
  		'content': 'I adopted a puppy!'
  	},
  	{
  		'date': 'Feb 7th',
  		'content': 'My puppy ran away.'	
  	},
  	{
  		'date': 'Feb 8th',
  		'content': 'FOUND MY PUPPY!'
  	},
  	{
  		'date': 'Feb 9th',
  		'content': 'Nooo it ran away again.'	
  	},
  	{
  		'date': 'Feb 10th',
  		'content': 'Had a job interview with Microsoft today.'
  	},
  	{
  		'date': 'Feb 11th',
  		'content': 'Visited my grandma!'	
  	},
  	{
  		'date': 'Feb 12th',
  		'content': 'Went to the farmers market'
  	},
  	{
  		'date': 'Feb 13th',
  		'content': 'It is friday the 13th!'	
  	},
]
  });
};