

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
//var users = require('./routes/users');
var app = express();
var scribe = require('scribe-js')(); // Scribe js for logging of server events. Go to http://localhost:5000/logs for more detail on logs for each day
app.use(scribe.express.logger()); //Log each request
var ldap = require('ldapjs');// ldap js
var nodemailer = require('nodemailer');// nodemailer
var aop = require("node-aop");// Node.js require. Use window.aop in browser
//var i18n = new (require('i18n-2'))({
    // setup some locales - other locales default to the first locale
    //locales: ['en', 'de']
//});

app.use('/logs', scribe.webPanel());
var connection = require('./modules/Database/connect.js') //Initial connection to the database
// React js
//var React = require('react');
// il8n translate

/*
*************************************
    Include various user modules here
*************************************
 */
var spaces = require('./modules/Spaces/spaces.js');
var notification = require('./modules/Notification/NotificationA.js');


/*
 Test code for spaces

 */
spaces.createBuzzSpace(2015,true,'ddd','Jan',[{id:1},{id:2}]);
//console.log(spaces.closeBuzzSpace('1','ccc'));
//console.log(spaces.assignAdministrator('2015', true, 'zzz', 'Jan', [{id:1},{id:2}], {id:3}, '1'));
//console.log(spaces.removeAdministrator('1', 'zzz', {id:2}));


/////////////////TONIA ADDED Testing of notification module
var userAddress="tonia.michael94@gmail.com";         //Gmail username eg name before @gmail.com
var userAddressPassword="";   //Gmail password
var recipientAddress="u13014171@tuks.co.za";   //email address of recipient
var senderAddress="tonia.michael94@gmail.com";  //email address of sender
var mailSubject="jjju"; //Notification subject
var mailMessage="juu";//Message to be sent
notification.sendNotification(userAddress,userAddressPassword,senderAddress,recipientAddress,mailSubject,mailMessage);
//////////



/*
**************TO-DO******************
* jsreport
* handlebars
* broadway plugin framework
* electrolyte
* node-cache caching framework
* restify REST framework
 */
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

<<<<<<< Updated upstream
/*
    When the server cannot be started without the use of the batch file, start the server using node app.js

 */



/*
=======
>>>>>>> Stashed changes
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Node server running on port: " + port);
});
<<<<<<< Updated upstream
*/
var server = app.listen(3000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)

})
=======
>>>>>>> Stashed changes

module.exports = app;
