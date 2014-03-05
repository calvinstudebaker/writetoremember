//var pastEntries = require("../data/pastData.json");
var models = require('../models');
var fs = require('fs');

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
      console.log("entries is of form:");
      console.log(entries);
      //console.log(type(entries));
      if (!entries) {
        res.render('past', {'entries': entries});
      } else {
        console.log("it got to the renderentries in pastroute");
        res.render('pastEmpty');
      }
    }
  }
};

exports.addEntry = function(req, res){
  var data = req.body;
  var userID = req.session.username;
  if(!data.mood_index) {
    data.mood_index = 0;
  }

  var imageName;

  //adapted from http://tonyspiro.com/uploading-and-resizing-an-image-using-node-js/
  fs.readFile(req.files.image.path, function(err, data){
    imageName = req.files.image.name;

    if(!imageName){
      console.log("There was an error in the photo upload!");
      res.redirect("/home");
      res.end();
    } else{
      var newPath = __dirname + "/uploads/images/" + imageName;
      fs.writeFile(newPath, data, function(err){
        res.redirect("/past");
      });
    }
  });

  var imagePath = "/uploads/images/" + imageName;  
  var newEntry = new models.Entry({
    "user_id" : userID,
    "text": data.text,
    "date": data.date,
    "image": "uploads/",
    "mood_index" : data.mood_index
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