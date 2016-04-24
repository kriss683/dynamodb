'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  uuid = require('node-uuid'),
  AWS = require('aws-sdk'); 

var config = require('../../../config/config');
AWS.config.update(config.awsConfig);
var docClient = new AWS.DynamoDB.DocumentClient();

/**
 * Create an Analytic item
 */
exports.addSensor = function (req, res) {
	var params = {
			TableName: config.awsTableName,
			Item:{
		        'sensor_id': Math.floor(Math.random()*Math.random()*1000),
		        'sensor_name': req.body.sensor_name ,
		        'sensor_friendly_name': req.body.sensor_friendly_name,
		        'room': req.body.room,
		        'status':  req.body.status,
		        'data':[]
		    }
	};
	      
	docClient.put(params, function(err, data) {
	         if(err){
	        	 console.log(err);
	        	 res.json({status:'fail'});
	         }else{
	        	 res.json({status:'success'});
	         }
	});
};

exports.addSensorData = function(req,res){
	var params = {
			TableName: config.awsTableName,
			Key: {sensor_id: req.body.sensor_id},
			UpdateExpression: "SET #data = list_append(#data, :dataToAdd)",
			ExpressionAttributeNames : {
				  "#data" : "data"
				},
			ExpressionAttributeValues:{
		        ":dataToAdd" : [{"dateTime": req.body.dateTime, "value": req.body.dataValue}]
			}
			
	};
	      
	docClient.update(params, function(err, data) {
	         if(err){
	        	 console.log(err);
	        	 res.json({status:'fail'});
	         }else{
	        	 res.json({status:'success'});
	         }
	});
	
};

exports.getSensors = function(req,res){
	  var params = {
			  'TableName': config.awsTableName
	  };

	  docClient.scan(params, function(err, data) {
			    if (err) {
			        res.json({status:'error'});
			    }else {
			        res.json(data.Items);
			    }
	 });
};
