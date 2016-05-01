'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  AWS = require('aws-sdk'),
  standardResponse = require('../components/standardResponse'),
  utils = require('../components/commonFunctions'),
  docClient = require('../components/databaseClient'),
  savingsUtil = require('../components/savingsCalculators'),
  mathUtil = require('mathjs'),
  config = require('../../../config/config');


exports.getSavingsData = function(req,res){

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
	    	var sensorIdList = [];
	    	for(var i = 0; i<sensorsList.length; i++){
	    		sensorIdList.push(sensorsList[i].sensorId);
	    	}
	    
			getLatestSensorData(sensorIdList, function(latestDataList){
				var savingsCalc = {alertTriggered: [], warningTriggered: []};		
				for(var j = latestDataList.length -1; j >= 0; j--){
							for(var i = 0; i< sensorsList.length; i++){
								
								if(sensorsList[i].sensorId == latestDataList[j].payload.ip){
									savingsCalc = savingsUtil.calcSingleSavings(latestDataList[j].value,sensorsList[i].sensorType, savingsCalc);
								
								}
						}
					}
				
						var policyEndDate = new Date();
						policyEndDate.setDate(policyEndDate.getDate() + 30);
						var response = {
							estimatedSavings: savingsUtil.calcTotalSavings(savingsCalc).toFixed(1),
							policyEndDate: policyEndDate
						};
						res.json(standardResponse(null,response));
			});	
		}
	});
};

function getLatestSensorData(sensorIdList,callback){
	var params = {
				  'TableName': config.awsSensorValues,
				  FilterExpression: "contains(:sensorIdList, payload.ip) ",
				   ExpressionAttributeValues: {
				        ":sensorIdList": sensorIdList.toString()
				    }
		  };
	docClient.scan(params, function(err, data) {
			if (err) {
				console.log('Error in getlatestSensorData:');
				console.log(err);
		        callback(false);
		    }else {
		    	console.log("# Returned list of data by sensor ID:");
		    	console.log(data.Items.length);
		    	callback(data.Items);
		    }
	});
};
