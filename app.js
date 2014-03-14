
/**
 * Module dependencies.
 */
var fs = require('fs');
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');
var index = require('./routes/indexRoute');
var home = require('./routes/homeRoute');
var placeholder = require('./routes/placeholderRoute');
var past = require('./routes/pastRoute');
var settings = require('./routes/settingsRoute');
var push = require('./routes/pushRoute');
var createAccount = require('./routes/createAccountRoute');
var clientSessions = require("client-sessions");
var instructions = require('./routes/instructionsRoute');
var local_database_name = 'writetoremember';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);//, collections);//might need to add  "collections"
var app = express();

// all environments
app.configure(function () {
	app.set('port', process.env.PORT || 3000);//or localhost:27017
	app.set('views', path.join(__dirname, 'views'));
	app.engine('handlebars', handlebars());
	app.set('view engine', 'handlebars');
	app.use(express.favicon());
	app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/uploads' }));
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser('Intro HCI secret key'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(clientSessions({
  secret: '0GBlJZ9EKBt2Zbi2flRPvzturukdjfaksdjfCewBxXK' // CHANGE THIS!
}));


// Add routes here
app.get('/', index.view);
app.get('/placeholder', placeholder.view);
app.get('/home', home.view);
app.get('/past', past.view);
app.get('/settings', settings.view);
app.get('/create', createAccount.view);
app.get('/instructions', instructions.view);
app.post('/testPush', push.testPush)
app.post('/signIn', index.signIn);
app.post('/saveSettings', settings.save);
app.post('/createAccount', createAccount.createAccount);
app.post('/getRandomEntry', past.getRandomEntry);
app.post('/editEntry', past.editEntry);
app.post('/removeEntry', past.removeEntry);
app.post('/addEntry', past.addEntry);
app.post('/instructions', instructions.view);


//see photo uploaded to local filesystem
app.get('/uploads/images/:file', function (req, res){
	var file = req.params.file;
	console.log("image requested: " + file);
	var img = fs.readFileSync(__dirname + "/uploads/images/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');
});

// Example route
// app.get('/users', user.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
