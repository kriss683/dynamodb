'use-strict';

var travLimits = [];
travLimits["temperature"] = {alert: 27, warning: 25};
	

exports.calcSingleSavings = function(value,sensorType, savingsCalc){
	switch(sensorType){
		case 'temperature':{
			if(travLimits["temperature"].alert){
				if(value < alert){
					savingsCalc.alertTriggered.push(10);
				}else{
					savingsCalc.alertTriggered.push(1);
				}
			}
			if(travLimits["temperature"].warning){
				if(value < warning){
					savingsCalc.warningTriggered.push(10);
				}else{
					savingsCalc.warningTriggered.push(10);
				}
			}
		}
	};
	return savingsCalc;
};