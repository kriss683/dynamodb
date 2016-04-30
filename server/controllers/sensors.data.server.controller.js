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


exports.getSensorData = function(req,res){
	var sensorId = req.params.sensorId;
	if(sensorId){
		sensorId = sensorId.replace(/-/g,".");
		var params = {
				  'TableName': config.awsSensorValues,
				  FilterExpression: "payload.ip = :sensorId",
				   ExpressionAttributeValues: {
				        ":sensorId":sensorId
				    }
		  };
	}else{
		var params = {
				  'TableName': config.awsSensorValues,
				  
		  };
	}
		docClient.scan(params, function(err, data) {
			if (err) {
		        res.json({status:'error'});
		        console.log(err);
		    }else {
		    	var sensorData = [];
		    	for(var i = 0; i< data.Items.length; i++){
		    			var sensorDate = new Date(Number(data.Items[i].key));
					    sensorData.push({
					    	sensorId: data.Items[i].payload.ip,
					    	timestamp: sensorDate,
					    	value: ((data.Items[i].value)*1.8 + 32).toFixed(2)
					    });
					}
					res.json(standardResponse(null,sensorData.sort(utils.sortByProperty("timestamp"))));
				
		    }
		});
};
