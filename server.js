/* global __dirname */
var express = require('express');
var config = require('./config');
var http = require('http');
var path = require('path');

var app     = express();
//keep reference to config
app.config = config;
//setup the web server
app.server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, '/views')));

app.get('/',function(req,res){
  res.sendFile('index.html');
  //It will find and locate index.html from View or Scripts
});

var boot = function () {
    //listen up
    app.server.listen(app.config.port, function () {
        //and... we're live
        console.log('Server is running on port ' + config.port);
    });
};

var shutdown = function () {
    console.log('Server is shuting down on the port ' + config.port);
    app.server.close();
};

if (require.main === module) {
    boot();
} else {
    console.info('Running app as a module');
    app.boot = boot;
    app.shutdown = shutdown;
    app.port = app.config.port;
}

module.exports = app;