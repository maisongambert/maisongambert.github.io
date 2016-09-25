function index_ready(){
	
}


var covered_offset = [];
var covered_visibility = [];
var callOffset;
var overviewOffset;
var adviceOffset;
var $call = $('#call > img')[0]; 
var rightBoxVisible = false;
var $callSlide = document.getElementById('chefs');
var callVisible = false;
var overviewVisible = false;
var adviceVisible = false;


function set_positions(){
	if(!isMobile){	
	$('#calls .right > div').height($('#calls .half:eq(0) > img').height());
		$('#calls .left').height($('#calls .half:eq(0) > img').height()*2)
	}
		
		covered_offset = [];
		
		$('#calls .covered').each(function(i){
			 covered_offset.push($('.covered:eq('+i+')').offset().top);
			 covered_visibility.push(false);
		});
		
		callOffset = $('#call').offset().top;
		overviewOffset = $('#overview').offset().top;
		$callHeight = $($callSlide).height();
		adviceOffset = $('#advice').offset().top
		$overviewHeight = $('#overview').height();
		
}


function index_resize (){
	set_positions();	
}

function index_load(){
	set_positions();
	
	

	setTimeout(function(){
		$('#logo_home .p1').removeClass('hidden');
	},500)
	setTimeout(function(){
		if(isMobile){
			$('#menu_bar').removeClass('hidden');
		}	
		$('#logo_home .p2').removeClass('hidden');
	},550)
	setTimeout(function(){
		
		$('#logo_home .maison_gambert').removeClass('top_double');
	},900)
	setTimeout(function(){
		$('#logo_home .sorrento').removeClass('top_double');
	},1000);
	
	setTimeout(function(){
		$('#main_box .pay h3').removeClass('top');
	},1500);
	setTimeout(function(){
		$('#main_box .pay h4').removeClass('top');
	},1600);
	
	setTimeout(function(){
		$('#main_box .upper_box .left, #main_box .upper_box .right ').removeClass('hidden');
	},1200);
	
	setTimeout(function(){
		$('#main_box .lower_box .left, #main_box .lower_box .right ').removeClass('hidden');
		$('#main_box .upper_box .top').removeClass('hidden');
	},1300);
	setTimeout(function(){
		$('#main_box .lower_box .bottom').removeClass('hidden');
	},1400);
	setTimeout(function(){
		$('#scroll_down').removeClass('top_single');
	},1500);

}


$menuFixed = false;



function index_scroll(){
	if(!isMobile){
		if(_pageY > 100 && !$menuFixed){
			$('#menu_bar').removeClass('hidden');
			$menuFixed = true;
		} else if (_pageY < 100 && $menuFixed){
			$('#menu_bar').addClass('hidden');
			$menuFixed = false;
		}
	}
	
	
	
	if(_pageY > 100 && !rightBoxVisible ){
		rightBoxVisible = true;
		$('#home_title h3').removeClass('no_width');
		setTimeout(function(){$('#home_title h4').removeClass('no_width');},150)
		
		setTimeout(function(){$('.chef_box').removeClass('hidden');},500);
		setTimeout(function(){$('.right_box .purple_box').removeClass('hidden')},600)
		$('.right_box .purple_box p').each(function(i){
			setTimeout(function(){$('.right_box .purple_box p:eq('+i+')').removeClass('top_double')},1100+(100*i));
		});
		setTimeout(function(){$('.right_box .cover').removeClass('hidden')},1450);
		setTimeout(function(){$('.right_box img').removeClass('hidden')},1500);
		
		setTimeout(function(){$('.left_box .body_text').removeClass('top_double');},150)
	}
	
	$('.covered').each(function(i){
    	if(_pageY >  covered_offset [i] - _window_height + 200 && !covered_visibility [i]){
    		 covered_visibility [i] = true;
    		 setTimeout(function(){$('.covered:eq('+i+') .cover').removeClass('hidden')},0);
    		 setTimeout(function(){$('.covered:eq('+i+') .content').removeClass('hidden')},50);
    	}	
	});
	
	if(_pageY > callOffset - _window_height && _pageY < callOffset + _window_height && !isMobile && !isHandheld){
	$callSlide.style[Modernizr.prefixed('transform')] = 'translate3d(0,'+(-$callHeight-((callOffset - _window_height)-window.pageYOffset))/3+'px, 0)';
	}
	
	if(_pageY > callOffset - _window_height + $callHeight/2 && !callVisible ){
		callVisible = true;
		setTimeout(function(){
			$('#call .pay h3:eq(0)').removeClass('top');
		},500);
		setTimeout(function(){
			$('#call .pay h3:eq(1)').removeClass('top');
		},600);
		
		setTimeout(function(){
			$('#call .lower_box p:eq(0)').removeClass('top_single');
		},900);
		setTimeout(function(){
			$('#call .lower_box p:eq(1)').removeClass('top_single');
		},1000);
		setTimeout(function(){
			$('#call .lower_box img').removeClass('top_single');
		},1100);
		
		setTimeout(function(){
			$('#call .upper_box .left, #call .upper_box .right ').removeClass('hidden');
		},200);
		
		setTimeout(function(){
			$('#call .lower_box .left, #call .lower_box .right ').removeClass('hidden');
			$('#call .upper_box .top').removeClass('hidden');
		},300);
		setTimeout(function(){
			$('#call .lower_box .bottom').removeClass('hidden');
		},400);
	}
	if(_pageY > overviewOffset - _window_height + $callHeight/2 && !overviewVisible ){
		overviewVisible = true;
		$('#overview .title_overflow h2').removeClass('top');
		$('#overview_content').removeClass('hidden');
		setTimeout(function(){$('#overview .back').removeClass('hidden');},600);
		$('#overview_content .third').each(function(i){
			setTimeout(function(){$('#overview_content .third:eq('+i+') .covered .cover').removeClass('hidden')},800+(100*i));
			setTimeout(function(){$('#overview_content .third:eq('+i+') .covered .content').removeClass('hidden')},850+(100*i));
			setTimeout(function(){$('#overview_content .third:eq('+i+') .covered .content img').removeClass('hidden_by_scaling_low')},1200+(100*i));

			
		})
		
	}
	
	if(_pageY > adviceOffset - _window_height/2 && !adviceVisible ){
		 adviceVisible = true;
		 $('#advice > div').each(function(i){
			 setTimeout(function(){$('#advice > div:eq('+i+') .top').removeClass('top');},100*i); 
		 });
	}
}


