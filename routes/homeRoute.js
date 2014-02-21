var data = require("../data/usersData");

exports.view = function(req, res){
   if (!req.session.username) {
  	   res.render('index');
   } else {
        
			}
			else {
				alert("Failure connecting to server. Please try again later.");
			}
  			res.render('home', data);
  		});
  }
}