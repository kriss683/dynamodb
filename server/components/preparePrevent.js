'use strict';

exports.getPreparePreventContent = function(sensorType){
	var preparePrevent = {};
	switch(sensorType){
		case 'temperature':
			preparePrevent.title = "Drier Maintenance Tips";
			preparePrevent.description = "Clean out the lint filter after each load. Lint may also collect under and behind your dryer, so do not forget to clean these areas.";
			preparePrevent.url = 'https://www.travelers.com/resources/home/fire-safety/how-to-prevent-house-fires.aspx';
			preparePrevent.urlTitle = "Read more on drier safety and maintenance.";
			break;
	};
	return preparePrevent;
		
};