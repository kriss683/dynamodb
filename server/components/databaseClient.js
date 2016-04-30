'use strict';

var AWS = require('aws-sdk');
var config = require('../../../config/config');
AWS.config.update(config.awsConfig);
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;