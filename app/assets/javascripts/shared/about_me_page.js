var about_me_page = function(){
	ele.framed_garret = document.getElementById("framed_garret");
	ele.a_personal_link = document.getElementById("a_personal_link");
	ele.a_personal = document.getElementById("a_personal");
	ele.a_technical_link = document.getElementById("a_technical_link");
	ele.a_technical = document.getElementById("a_technical");

	
	// -----------------------------------------------------------------------------------------------
	// page_movable_wrapper setup
	// -----------------------------------------------------------------------------------------------
	var SHIFT_RIGHT = 80;
	var me = {};
	var that = page_movable_wrapper(ele.about_me, me);
	that.left_obj_width = ele.fixed_summary.width();
	that.name = "about";
	that.color = "#993300";
	me.hidden_x = function(){ return -100 - me.ele.width(); };
	me.hidden_y = function(){ return 0; };
	that.page_layout_width = function(){ return me.ele.width() - SHIFT_RIGHT; };
	
	me.after_update = function(){
		var dist_to_y_center = window.innerHeight / 2 - me.ele.y();
		
		ele.framed_garret.style.top = (dist_to_y_center - 150) + "px";
		
	};
	
	
	
	// point from link to container
	ele.a_personal_link.text_container = ele.a_personal;
	ele.a_technical_link.text_container = ele.a_technical;
	
	var links = [ele.a_personal_link, ele.a_technical_link];
	var curr_link;
	links.each(function(link){
		link.onclick = function(){
			if (curr_link && curr_link ==  link){
				return;
			}
			if (curr_link) {
				curr_link.text_container.style.display = "none";
				curr_link.style.display = "inline";
			}
			
			link.style.display = "none";
			$(link.text_container).fadeIn();
			curr_link = link;
			return false;
		};
	});
	
	// init
	curr_link = ele.a_technical_link;
	links[0].click();
	
	
	
	
	return that;
};