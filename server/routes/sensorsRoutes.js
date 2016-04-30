'use strict';

/**
 * Module dependencies
 */
var sensorsCtrl = require('../controllers/sensors.server.controller'),
	sensorDataCtrl = require('../controllers/sensors.data.server.controller'), 
	sensorPreferenceCtrl = require('../controllers/sensors.preferences.server.controller'),
	sensorSavingsCtrl = require('../controllers/sensors.savings.server.controller');



module.exports = function (app) {
  // Get Sensors
  app.get('/api/sensors', sensorsCtrl.getAllSensors);
  app.get('/api/sensors/:userId', sensorsCtrl.getSensors);
  
  //Get Preferences
  app.get('/api/sensors/preferences/:userId', sensorPreferenceCtrl.getAlertPreferences);
  //app.get('/api/sensors/preferences/:userId/:sensorId', sensorsCtrl.getAlertPreferencesWithSensorId);
  
  //Get Sensor Data
  app.get('/api/sensorData', sensorDataCtrl.getSensorData);
  app.get('/api/sensorData/:sensorId', sensorDataCtrl.getSensorData);
  
  //Get Estimated Savings
  app.get('/api/sensors/savings/:userId', sensorSavingsCtrl.getSavingsData);
};