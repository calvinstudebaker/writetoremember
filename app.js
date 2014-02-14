
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/indexRoute');
var home = require('./routes/homeRoute');
var placeholder = require('./routes/placeholderRoute');
var past = require('./routes/pastRoute');
var settings = require('./routes/settingsRoute');
var createAccount = require('./routes/createAccountRoute');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/placeholder', placeholder.view);
app.get('/home', home.view);
app.get('/past', past.view);
app.get('/settings', settings.view);
app.get('/create', createAccount.view);
app.post('/signIn', index.signIn);
app.post('/addEntry', past.addEntry);
app.post('/saveSettings', settings.save);
app.post('/create', createAccount.create);


// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
