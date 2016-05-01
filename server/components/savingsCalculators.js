'use-strict';

var mathUtil = require('mathjs');

var travLimits = [];
travLimits["temperature"] = {alert: 27, warning: 25};
	

exports.calcSingleSavings = function(value,sensorType, savingsCalc){
	switch(sensorType){
		case 'temperature':{
			if(travLimits["temperature"].alert){
				if(value < travLimits["temperature"].alert){
					savingsCalc.alertTriggered.push(10);
				}else{
					savingsCalc.alertTriggered.push(-150);
				}
			}
			if(travLimits["temperature"].warning){
				if(value < travLimits["temperature"].warning){
					savingsCalc.warningTriggered.push(10);
				}else{
					savingsCalc.warningTriggered.push(-10);
				}
			}
		}
	};
	return savingsCalc;
};

exports.calcTotalSavings = function(savingsCalc){
	var averageAlertTriggered = mathUtil.mean(savingsCalc.warningTriggered);
	var averageWarningTriggered = mathUtil.mean(savingsCalc.alertTriggered);
	var mean = mathUtil.mean([averageAlertTriggered,averageWarningTriggered]);
	if(mean > 0){
		return mean;
	}else{
		return 0;
	}
}