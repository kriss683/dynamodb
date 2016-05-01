'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  AWS = require('aws-sdk'),
  standardResponse = require('../components/standardResponse'),
  utils = require('../components/commonFunctions'),
  docClient = require('../components/databaseClient'),
  preparePrevent = require('../components/preparePrevent'),
  config = require('../../../config/config');

//Get list of sensors by userID
exports.getSensors = function(req,res){
			var sensorsList = [];
	
			var params = {
					  'TableName': config.awsSensors,
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
			    }else{
			    	var sensorsList = data.Items[0].sensors;
			    
					getLatestSensorData(function(latestDataList){
						console.log("latest data list");
						
							for(var i = 0; i< sensorsList.length; i++){
								sensorsList[i].status = "GOOD";
								for(var j = latestDataList.length -1; j >= 0; j--){
									if(sensorsList[i].sensorId == latestDataList[j].payload.ip){
										sensorsList[i].latestSensorValue = latestDataList[j].value;
										sensorsList[i].latestSensorReading = new Date(Number(latestDataList[j].key));
										if(sensorsList[i].latestSensorValue >= sensorsList[i].limits.highValueThreshold || sensorsList[i].latestSensorValue <= sensorsList[i].limits.lowValueThreshold){
											sensorsList[i].status = "WARNING";
											sensorsList[i].preparePrevent = preparePrevent.getPreparePreventContent(sensorsList[i].sensorType);
										}else{
											sensorsList[i].status = "GOOD";
										}
										
										break;
									}
								}
							}
						        res.json(standardResponse(null,sensorsList));
					});	
				}
			});
};

//Get All Sensors
exports.getAllSensors = function(req,res){
		var params = {
				  'TableName': config.awsSensors,
		};
		docClient.scan(params, function(err, data) {
		    if (err) {
		        res.json({status:'error'});
		    }else {
		    	res.json(standardResponse(null,data.Items));
		    }
		});
};


function getLatestSensorData(callback){
	var params = {
				  'TableName': config.awsSensorValues
		  };
	docClient.scan(params, function(err, data) {
			if (err) {
				console.log('Error in getlatestSensorData');
		        callback(sensorId,false);
		    }else {
		    	var latestData = (data.Items).sort(utils.sortByProperty("key") );
		    	callback(latestData);
				
		    }
	});
};


