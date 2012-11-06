// -----------------------------------------------------------------------------------------------
// page html elements
// -----------------------------------------------------------------------------------------------

ele.body_right_border = document.getElementById("body_right_border");
ele.fixed_summary = document.getElementById("fixed_summary_box");
ele.start_here = document.getElementById("page_start_here");
ele.about_me = document.getElementById("page_about_me");
ele.blog = document.getElementById("page_blog");




// -----------------------------------------------------------------------------------------------
// left side container that's always on page and changes origin.x based on current page width
// -----------------------------------------------------------------------------------------------
var fixed_summary_container = function(){
	var me = {};
	var that = movable_wrapper(ele.fixed_summary, me);
	me.expected_x = function(){
		var curr_page_width = (page_manager.get_current_page()) ? page_manager.get_current_page().page_layout_width() : 0;
		return (window.innerWidth - ele.fixed_summary.width() - curr_page_width) / 2;
	};
	me.expected_y = function(){
		return (window.innerHeight - ele.fixed_summary.height()) / 2;
	};
	return that;
}();


// -----------------------------------------------------------------------------------------------
// create and add pages to page_manager
// -----------------------------------------------------------------------------------------------
var start_here_page = function(){
	var me = {};
	var that = page_movable_wrapper(ele.start_here, me);
	that.left_obj_width = ele.fixed_summary.width();
	that.name = "start";
	that.color = "#454545";
	me.hidden_x = function(){ return 0; };
	me.hidden_y = function(){ return -100 - me.ele.height(); };
	return that;
}();
var blog_page = function(){
	var me = {};
	var that = page_movable_wrapper(ele.blog, me);
	that.left_obj_width = ele.fixed_summary.width();
	that.name = "blog";
	that.color = "#003366";
	me.hidden_x = function(){ return -100 - me.ele.width(); };
	me.hidden_y = function(){ return -100 - me.ele.height(); };
	return that;
}();
[start_here_page, about_me_page(), blog_page, projects_page()].each(function(pg){
	page_manager.add_page(pg);
});


// -----------------------------------------------------------------------------------------------
// init
// -----------------------------------------------------------------------------------------------
var init = function(){
	page_manager.init();
	fixed_summary_container.init();
	// fade in page
	$("body").hide();
	$("body").fadeIn(500);
}();






