'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  AWS = require('aws-sdk'),
  standardResponse = require('../components/standardResponse'),
  utils = require('../components/commonFunctions'),
  docClient = require('../components/databaseClient'),
  config = require('../../../config/config');

//getAlertPreferences
exports.getAlertPreferences = function(req,res){
	var params = {
				 'TableName': config.awsPreferences,
				 KeyConditionExpression: "#id = :userId",
				 ExpressionAttributeNames:{
					  "#id": "id"
				    },
				  ExpressionAttributeValues: {
				        ":userId":req.params.userId
				    }
		};
	
	docClient.query(params, function(err, data) {
		if (err) {
	        res.json({status:'error'});
	        console.log(err);
	    }else {
	        res.json(data.Items);
	    }
	});
	
};

//getAlertPreferences
exports.getAlertPreferencesWithSensorId = function(req,res){
	var params = {
				 'TableName': config.awsPreferences,
				 KeyConditionExpression: "#id = :userId AND #sensorId = :sensorId",
				 ExpressionAttributeNames:{
					  "#id": "id",
					  "#sensorId": "sensorId"
				    },
				  ExpressionAttributeValues: {
				        ":userId":req.params.userId,
				        ":sensorId:": req.params.sensorId
				    }
		};
	
	docClient.query(params, function(err, data) {
		if (err) {
	        res.json({status:'error'});
	        console.log(err);
	    }else {
	        res.json(data.Items);
	    }
	});
	
};