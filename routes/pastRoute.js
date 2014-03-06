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
      .sort({'date': -1})
      .exec(renderEntries);
      
    function renderEntries(err, entries) {
      console.log("entries is of form:");
      console.log(entries);
      //console.log(type(entries));
      if (entries==null || entries == []) {
          res.render('pastEmpty');
      } else {
          res.render('past', {'entries': entries});
      }
    }
  }
};

exports.addEntry = function(req, res){
  console.log(req.body);
  var transloaditData = JSON.parse(req.body.transloadit);
  var transloaditResults = transloaditData.results;
  var photoURL;
  if(transloaditResults.hasOwnProperty('resize')) photoURL = transloaditData.results.resize[0].url;
  else photoURL = "none";
  console.log("Photo url: " + photoURL);
  var userID = req.session.username;
  var date = getAbbreviatedDate();

  var newEntry = new models.Entry({
    "user_id" : userID,
    "text": req.body.text,
    "date": date,
    "image": photoURL,
    "mood_index" : req.body.mood_index
  });

  newEntry.save(afterSaving);
  function afterSaving(err) { // this is a callback
    if(err) {console.log(err); res.send(500);}
    else{
      models.Entry
      .find({"user_id":req.session.username})
      .sort({'date':-1})
      .exec(renderEntries);
    }
  };

  function renderEntries(err, entries) {
      console.log("entries is of form:");
      console.log(entries);
      //console.log(type(entries));
      if (entries==null || entries == []) {
          res.render('pastEmpty');
      } else {
          res.render('past', {'entries': entries});
      }
  };

  // var imageName = req.files.image.name;
  // var imagePath = "none";
  // if(!imageName){
  //   console.log("no image found");
  //   models.Entry
  //     .find({"user_id":req.session.username})
  //     .sort({'date':-1})
  //     .exec(renderEntries);
  // }else{
  //   //adapted from http://tonyspiro.com/uploading-and-resizing-an-image-using-node-js/
  //   fs.readFile(req.files.image.path, function(err, data){
  //     imageName = req.files.image.name;
  //     var newPath = __dirname + "/../uploads/images/" + imageName;
  //     imagePath = "/uploads/images/" + imageName;
  //     fs.writeFile(newPath, data, function(err){
  //       if(err) console.log(err);
  //     });
  //     console.log("image saved to " + imagePath);

  //     var newEntry = new models.Entry({
  //       "user_id" : userID,
  //       "text": req.body.text,
  //       "date": date,
  //       "image": imagePath,//place-held in home.js
  //       "mood_index" : data.mood_index
  //     });
  //     console.log(newEntry);
  //     newEntry.save(afterSaving);
  //     function afterSaving(err) { // this is a callback
  //       if(err) {console.log(err); res.send(500);}
        
  //       models.Entry
  //         .find({"user_id":req.session.username})
  //         .sort({'date':-1})
  //         .exec(renderEntries);
  //     } 
  //   });
  // }

 // console.log(newEntry);
  //newEntry.save(afterSaving);

//  function afterSaving(err) { // this is a callback
   // if(err) {console.log(err); res.send(500);}
   // res.send(200);
  //}
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
    { $set: { "text" : req.body.text } })
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


function getAbbreviatedDate(){
  var monthNames = new Array(
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
  var now = new Date();
  var date = monthNames[now.getMonth()] + " " + now.getDate();
  return date;
}
