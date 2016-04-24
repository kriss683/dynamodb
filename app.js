'use strict';

module.exports = function(config) {

  var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser');
    

  var app = express();
  app.use(bodyParser.json());
  app.use(express.static(config.webServer.rootFolder));
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'authToken, Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
  //configure routes
  require('./server/routes/sensorsRoutes')(app);
  
  http.createServer(app)
    .listen(process.env.PORT || config.webServer.port, function() {
      console.log('web server start on port: ' + config.webServer.port);
    });

};