var pastEntries = require("../data/pastData.json");

exports.view = function(req, res){
  if (!req.session.username) {
  	res.render('index');
  } else {
    res.render('past', pastEntries);
  }
};

exports.addEntry = function(req, res){
  var data = req.body;
  var entryID = req.params.id;
  var newEntry = new Models.Entry({
    "text": form_data.text,
    "date": form_data.text
    //deal with image!!!!
})
  newProject.save(afterSaving);

  function afterSaving(err) { // this is a callback
  if(err) {console.log(err); res.send(500); }
}

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }

exports.deleteEntry= function(req, res) {
  var projectID = req.params.id;
  models.Project
    .find({"_id" : projectID})
    .remove()
    .exec(afterRemoval);

  function afterRemoval(err, projects) {
    if(err) console.log(err);
    res.send();
  }
}


  /**
	var newEntry = req.body;
	pastEntries['entries'].unshift(newEntry);
	var response = new Object();
	response.status = "success";
	res.json(response);
  **/
};

exports.getRandomEntry = function(req, res) {
    var random_index = Math.floor((Math.random()*entries.length)+1);
    var random_entry = pastEntries['entries'][random_index];
    random_entry.status = "success";
    res.json(random_entry);
};