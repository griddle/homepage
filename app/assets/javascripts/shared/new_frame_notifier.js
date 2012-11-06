
var new_frame_notifier = function(){
	var that = {};
	var MILLISECONDS_DELAY = 30;  // ~ 33 fps
	var interval = null;
	var listeners = [];
	
	// -----------------------------------------------------------------------------------------------
	// start and stop
	var start = function(){
		stop();
		interval = setInterval(function() {
			for (var k = 0; k < listeners.length; ++k){
				var listener = listeners[k];
				listener();
			}
		}, MILLISECONDS_DELAY);		
	};
	var stop = function(){
		clearInterval(interval);
	};
	
	// -----------------------------------------------------------------------------------------------
	// register handlers
	// -----------------------------------------------------------------------------------------------	
	var register_listener = function(listener){
		var idx = listeners.indexOf(listener);
		if (idx == -1){
			listeners.push(listener);
		}
		if (listeners.length == 1)  start();
	};
	var remove_listener = function(listener){
		var idx = listeners.indexOf(listener);
		if (idx >= 0){
			listeners.splice(idx, 1);
		}
		if (listeners.length == 0)  stop();
	};
	
	// -----------------------------------------------------------------------------------------------
	// public methods
	that.register_listener = register_listener;
	that.remove_listener = remove_listener;
		
	
	return that;
}();


