// -----------------------------------------------------------------------------------------------
// listens to new_frame_notifier and calls update_location on each frame.  
// moves 10% of the way to it's expected location the x and y axis on each frame.
// Supports fixed positioned elements on screen
var movable_wrapper = function(element, me){
	var that = {};
	me.ele = element;
	var MULTIPLIER = 0.15;
	me.expected_x = function(){ return null };  // override
	me.expected_y = function(){ return null };  // override
	me.show = function(){
		me.ele.style.visibility = "visible";
	};
	me.hide = function(){
		me.ele.style.visibility = "hidden";
	};
	me.is_on_screen = function(){
		var window_rect = {
												x : 0,
												y : 0,
												width : window.innerWidth,
												height : window.innerHeight
											};
		if (me.ele.x() > window_rect.x + window_rect.width) return false;
		if (window_rect.x > me.ele.x() + me.ele.width()) return false;
		if (me.ele.y() > window_rect.y + window_rect.height) return false;
		if (window_rect.y > me.ele.y() + me.ele.height()) return false;
		return true;
	};
	me.get_new_location = function(current, expected){
		var MIN_MOVE_AMT = 1;
		if (expected != null){
			var x_to_go = expected - current;
			var move_x_by = MULTIPLIER * x_to_go;
			if (Math.abs(move_x_by) < MIN_MOVE_AMT){
				if (Math.abs(x_to_go) < MIN_MOVE_AMT){
					move_x_by =  x_to_go;
				}
				else {
					move_x_by = MIN_MOVE_AMT * move_x_by / Math.abs(move_x_by);
				}
			}
			return current + move_x_by;
		}
		return null;
	};
	me.update_location = function(){
		var new_x = me.get_new_location( me.ele.x(), me.expected_x() );
		var new_y = me.get_new_location( me.ele.y(), me.expected_y() );
		me.ele.move_to(new_x, new_y);  // move x,y
		(me.is_on_screen()) ? me.show() : me.hide();  // showing or hiding
	};
	me.before_update = function(){};
	me.after_update = function(){};
	me.update = function(){
		me.before_update();
		me.update_location();
		me.after_update();
	};
	that.init = function(){
		me.ele.move_to(me.expected_x(), me.expected_y());
		new_frame_notifier.register_listener( me.update );
	};
	return that;
};


var page_movable_wrapper = function(element, me){
	var that = movable_wrapper(element, me);
	that.is_displayed = false;
	that.left_obj_width = 0;
	me.hidden_x = function(){
		return -1.1 * me.ele.width();  // default, usually overriden
	};
	me.hidden_y = function(){
		return -1.1 * me.ele.height();  // default, usually overriden
	};
	me.display_x = function(){
		return (window.innerWidth - that.page_layout_width() + that.left_obj_width) / 2;
	};
	me.display_y = function(){
		return (window.innerHeight - element.height()) / 2;
	};
	me.expected_x = function(){
		if (that.is_displayed){
			return me.display_x();
		}
		else {
			return me.hidden_x();
		}
	};
	me.expected_y = function(){
		if (that.is_displayed){
			return me.display_y();
		}
		else {
			return me.hidden_y();
		}
	};
	that.page_layout_width = function(){
		return me.ele.width();
	};
	return that;
};
