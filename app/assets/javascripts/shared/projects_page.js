var projects_page = function(){
	ele.enter_password_box = document.getElementById("enter_password_box");
	ele.projects_page = document.getElementById("page_projects");
	ele.projects_form = document.getElementById("portfolio_request");
	ele.view_projects_password = document.getElementById("view_projects_password");
	ele.why_password = document.getElementById("why_password");
	ele.why_pw_answered = document.getElementById("why_pw_answered");
	ele.why_again = document.getElementById("why_again");
	ele.why_again_answered = document.getElementById("why_again_answered");
	ele.why_request_spacer = document.getElementById("why_request_spacer");
	ele.project_pw_error_mssg = document.getElementById("project_pw_error_mssg");
	
	
	// -----------------------------------------------------------------------------------------------
	// page_movable_wrapper setup
	// -----------------------------------------------------------------------------------------------
	var me = {};
	var that = page_movable_wrapper(ele.projects_page, me);
	that.left_obj_width = ele.fixed_summary.width();
	that.name = "projects";
	that.color = "#99cc99";
	me.hidden_x = function(){ return window.innerWidth + 100; };
	// me.hidden_y = function(){ return me.ele.height() + 100; };
	me.hidden_y = function(){ return (window.innerHeight - me.ele.height()) / 2; };
	
	
	// -----------------------------------------------------------------------------------------------
	// no access yet
	// -----------------------------------------------------------------------------------------------
	var no_access_yet_setup = function(){
		// -----------------------------------------------------------------------------------------------
		// request explanation
		// -----------------------------------------------------------------------------------------------
		ele.why_pw_answered.style.display = "none";
		ele.why_password.onclick = function(e){
			ele.why_password.style.display = "none";
			ele.why_request_spacer.style.display = "none";
			$(ele.why_pw_answered).fadeIn();
			return false;
		};
		ele.why_again_answered.style.display = "none";
		ele.why_again.onclick = function(e){
			ele.why_again.style.display = "none";
			$(ele.why_again_answered).fadeIn();
			return false;
		};
		// -----------------------------------------------------------------------------------------------
		// on wrong pw
		// -----------------------------------------------------------------------------------------------
		var ntries = 0;
		var wrong_pw_timeout, on_wrong_pw = function(){
			++ntries;
			var user_mssg = null;
			switch(ntries){
				case 4:
					user_mssg = "sorry, keep trying!"
					break;
				case 7:
					user_mssg = "you're still going?  wow. persistent."
					break;
				case 12:
					user_mssg = "seriously?"
					break;
				default:
					user_mssg = "sorry, wrong password";
			}
			ele.project_pw_error_mssg.innerHTML = user_mssg;
			ele.project_pw_error_mssg.style.display = "inline";
			
			$(ele.project_pw_error_mssg).stop();
			clearTimeout(wrong_pw_timeout);
			wrong_pw_timeout = setTimeout(function(){
				$(ele.project_pw_error_mssg).fadeOut();
			}, 1000 * 2 );  // 2 seconds
			
		};
		// -----------------------------------------------------------------------------------------------
		// make request
		// -----------------------------------------------------------------------------------------------
		var xhr;
		ele.projects_form.onsubmit = function(e){
			if (xhr) xhr.abort();
			var pw = ele.view_projects_password.value;
			xhr = $.ajax({
				url: "/home/projects_request",
				type: "POST",
				data: "pw=" + pw,
				dataType: "json",
				success: function(data){
					if (data.error){
						on_wrong_pw();
						log(data.error);
					}
					else if (data.page){
						on_access_successful(data.page);
					}
				},
				error: function(data){
					log("error: " + data.statusText);
				}
			});
			return false;
		};
	}();
	
	
	var on_access_successful = function(_html){
		var switch_views = function(){
			// -----------------------------------------------------------------------------------------------
			// prep for switch to new projects view
			ele.projects_page.innerHTML = _html;
			ele.projects_page.className += " project_box_showing";
			ele.projects_box = document.getElementById("projects_box");
			// -----------------------------------------------------------------------------------------------
			// import javascript data
			var added_script = document.getElementById("project_data");
			var html = added_script.innerHTML;
			var global_obj = function(){return this;}();
			eval.apply(global_obj, [html.slice(html.indexOf("CDATA[") + 6, html.indexOf("]]>"))]);
			// -----------------------------------------------------------------------------------------------
			// switch display
			ele.projects_page.move_to( me.display_x(), me.display_y() );
			$(ele.projects_box).hide();
			$(ele.projects_box).fadeIn(500);
		}();
		
		var override_movable_wrapper_methods = function(){
			// -----------------------------------------------------------------------------------------------
			// override methods in movable component wrapper
			that.page_layout_width = function(){ return ele.projects_box.width(); };
			me.before_update = function(){
				ele.projects_page.style.height = "100%";
				if (ele.projects_box.height() > window.innerHeight){
					ele.projects_page.style.height = "100%";
				}
				else {
					ele.projects_page.style.height = ele.projects_box.height() + "px";
				}
			};
			me.after_update = function(){
				var new_width = window.innerWidth - me.ele.x();
				me.ele.style.width = new_width + "px";
			};
		}();
		
		
		// -----------------------------------------------------------------------------------------------
		// custom simple overlay
		// -----------------------------------------------------------------------------------------------
		ele.simple_overlay = document.getElementById("simple_overlay");
		ele.project_overview_box = document.getElementById("project_overview_box");
		ele.simple_overlay_close_button = document.getElementById("simple_overlay_close_button");
		$(ele.simple_overlay).appendTo("body");
		$(ele.project_overview_box).appendTo("body");
		show_overlay = function(){
			$(ele.simple_overlay).fadeIn(200);
			$(ele.project_overview_box).fadeIn(100);
		};
		hide_overlay = function(){
			$(ele.simple_overlay).hide();
			$(ele.project_overview_box).hide();
		};
		$(ele.simple_overlay).click(function(){
			hide_overlay();
		});
		$(ele.simple_overlay_close_button).click(function(){
			hide_overlay();
		});
		
		// -----------------------------------------------------------------------------------------------
		// show overlay
		// -----------------------------------------------------------------------------------------------
		ele.o_title = document.getElementById("o_title");
		ele.o_under_title_line = document.getElementById("o_under_title_line");
		ele.info_section = document.getElementById("info_section");
		var show_overlay_for_name = function(_id){
			var data = project_overlays[_id] || false;
			if (!data)  return;
			// log(data);
			
			// -----------------------------------------------------------------------------------------------
			// prep data
			data.imgs = data.imgs || {};
			
			// -----------------------------------------------------------------------------------------------
			// Populate and init slideshow
			$('#slides').empty();
			var slides_container = document.createElement("div");
			slides_container.className = "slides_container";
			for (var k=0; k < data.imgs.length; ++k){
				var new_img = document.createElement("img");
				new_img.src = kAssetDir + data.imgs[k];
				slides_container.appendChild(new_img);
			};
			$('#slides').append(slides_container);
			$('#slides').slides({
				preload: false,
				hoverPause: true,
				generatePagination: true,
				effect: 'fade',
				fadeSpeed: 100
			});
			// title
			ele.o_title.innerHTML = data.name;
			// date line
			ele.o_under_title_line.innerHTML = data.client + " <span class='bullet_separator'>&bull;</span> " + data.date;
			// right side info
			ele.info_section.innerHTML = data.info;
						
			show_overlay();
		};
		
		
		
		// -----------------------------------------------------------------------------------------------
		// animate rollover of project boxes
		// -----------------------------------------------------------------------------------------------
		var add_animation_event_handling = function(){
			var TIMEOUT_DELAY = 800;
			
			// set custom hover properties by box type
			$(".a_project_box.full_col").each(function(){
				this.hover_position_top = -92;
			});
			$(".a_project_box.two_third_col").each(function(){
				this.hover_position_top = -84;
			});
			$(".a_project_box.one_third_col").each(function(){
				this.hover_position_top = -112;
			});
			
			// all boxes, hover
			$(".a_project_box").hover(function(){
				var this_that = this;
				this.hover_timeout = setTimeout(function(){
					$(this_that).children(".a_project_inside_box:eq(0)").animate({top : this_that.hover_position_top + "px"}, 150);
					$(this_that).find(".project_more_info").css({"display" : "block"});
				}, TIMEOUT_DELAY);
				
				$(this).css({"box-shadow" : "inset 2px 2px 4px rgba(0,0,0,0.1)", "background-color" : "#eee"});
				$(this).find(".a_project_inside_box .inside_top").css({"box-shadow" : "2px 2px 4px rgba(0,0,0,0.1)"});
			},
			function(){
				clearTimeout(this.hover_timeout);
				$(this).children(".a_project_inside_box:eq(0)").animate({top : "0px"}, 150);
				$(this).find(".project_more_info").css({"display" : "none"});
				
				$(this).css({"box-shadow" : "", "background-color" : ""});
				$(this).find(".a_project_inside_box .inside_top").css({"box-shadow" : ""});
			});
			
			// on click
			$(".a_project_box").click(function(){
				show_overlay_for_name( this.id );
				clearTimeout(this.hover_timeout);
			});
			
		}();
		
		

		
	};
	
	
	// GTODO, 
	// ele.view_projects_password.value = "homer";  ele.projects_form.onsubmit();
	
	
	return that;
};