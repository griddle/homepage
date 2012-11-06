var page_manager = function(){
	var that = {};	
	var current_page = null;
	var pages = [];
	
	var add_page = function(pg){
		pages.push(pg);
	};
	// var remove_page = function(pg){
	// 	pages.slice(pages.indexOf(pg), 1);
	// };

	var update_right_border_for_page = function(new_page){
		ele.body_right_border.style.backgroundColor = new_page.color;
	};
	
	var change_page_to = function(new_page_name){
		pages.each(function(pg){
			if (pg.name == new_page_name){
				if (current_page) current_page.is_displayed = false;
				current_page = pg;
				current_page.is_displayed = true;
				update_right_border_for_page(current_page);
			}
		});
	};
	
	window.onhashchange = function(e){
		var hash = location.hash;
		change_page_to( hash.replace("#", "") );
	};
	
	var init = function(){		
		if (location.hash.length > 0){
			change_page_to( location.hash.replace("#", "") );
		}
		if (!current_page){ // if no or invalid hash on start
			change_page_to( "start" );
		}
		
		pages.each(function(pg){
			pg.init();
		});
	};
	
	// -----------------------------------------------------------------------------------------------
	// public methods
	that.init = init;
	that.add_page = add_page;
	that.get_current_page = function(){ return current_page; };
	
	return that;
}();