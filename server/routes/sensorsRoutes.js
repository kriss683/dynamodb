'use strict';

/**
 * Module dependencies
 */
var sensorsCtrl = require('../controllers/sensors.server.controller');


module.exports = function (app) {
  // Sensors Routes
  app.get('/api/sensors', sensorsCtrl.getSensors);
  app.post('/api/sensors', sensorsCtrl.addSensor);
  app.post('/api/sensorData', sensorsCtrl.addSensorData);	  
};