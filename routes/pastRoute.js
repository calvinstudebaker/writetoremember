//var pastEntries = require("../data/pastData.json");
var models = require('../models');

exports.view = function(req, res){
  if (!req.session.username) {
  	res.render('index');
  } else {
    //res.render('past', pastEntries);//this data needs to come from database!!!
    models.Entry
      .find({"user_id":req.session.username})
      .sort('-date')
      .exec(renderEntries);
      
    function renderEntries(err, entries) {
      res.render('past', {'entries': entries});
    }
  }
};

exports.addEntry = function(req, res){
  var data = req.body;
  var userID = req.session.username;
  //var mood_index
  var newEntry = new models.Entry({
    "user_id" : userID,
    "text": data.text,
    "date": data.date,
    "image": data.image,//place-held in home.js
   // "mood_index" : data.mood_index
  });
  console.log(newEntry);
  newEntry.save(afterSaving);
  function afterSaving(err) { // this is a callback
    if(err) {console.log(err); res.send(500);}
    res.send(200);
  }
};

exports.removeEntry= function(req, res) {
  var data = new Object();
  data.entryID = req.body.entryID;
  models.Entry
    .find({"_id":req.body.entryID, "user_id":req.session.username})
    .remove()
    .exec(afterRemoval);

  function afterRemoval(err, projects) {
    if(err) {console.log(err); res.send(500);}
    //switchToPage("/past");
    res.json(data);
  }
};

exports.editEntry = function(req, res){
  models.Entry
    .update({"_id":req.body.entryID, "user_id":req.session.username}, 
    { $set: { "text" : req.body.text } }
    )
    .exec(afterEdit);

  function afterEdit(err, projects) {
    if(err) {console.log(err); res.send(500);}
    res.send(200);
    //switchToPage("/past");
  }
};


exports.getRandomEntry = function(req, res) {
    var random_index = Math.floor((Math.random()*entries.length)+1);
    var random_entry = pastEntries['entries'][random_index];
    random_entry.status = "success";
    res.json(random_entry);
};