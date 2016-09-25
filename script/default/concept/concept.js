function concept_ready(){
	
}

function define_positions(){
	switch(action){
		case 'index':
			if(!isMobile){
				$('.smaller').each(function(i){
					$('.smaller:eq('+i+')').height($('.smaller:eq('+i+') .left img').height());	
				});
			}
		break;
		case 'invitation':
		case 'knowledge':
			$slide_4_height = $($slide_4).height();

			$('.smaller._1').height($('.smaller._1 #equipe_stages').height()+parseInt($('.smaller._1 #equipe_stages').css('margin-top'))+50);
			$('.smaller._2').height($('.smaller._2 .left img').height());	
		break;
		case 'exploration':
			if(!isMobile){		
			$('.smaller._1').height($('.smaller._1 .left img').height());
			$('.smaller._2').height($('.smaller._2 .center .max_width').height());
			}
			$slide_4_height = $($slide_4).height();

			if(!isMobile){		
			rimanente_foto_1 = $('.smaller._1 .right .covered:eq(0)').height() - ($('.smaller._1 .left img').height() - ($('.smaller._1 #equipe_stages').height()+parseInt($('.smaller._1 #equipe_stages').css('margin-top'))+50));
			alt_foto_2 = $('.smaller._2').height() - rimanente_foto_1;
			bordo_pagina = ($(window).width()-$('.smaller._2').width())/2;
			$('.smaller._1 .right .covered._2').height(alt_foto_2).width($('.smaller._1 .right').width()+bordo_pagina-30);
			if($('.smaller._1 .right .covered._2').height() > $('.smaller._1 .right .covered._2 img').height()){
				$('.smaller._1 .right .covered._2 img').css('height','100%');
				$('.smaller._1 .right .covered._2 img').css('width','auto');
			} else if($('.smaller._1 .right .covered._2').width() > $('.smaller._1 .right .covered._2 img').width()){
				$('.smaller._1 .right .covered._2 img').css('width','100%');
				$('.smaller._1 .right .covered._2 img').css('height','auto');
			}
			}
		break;
		case 'gift':
			$slide_4_height = $($slide_4).height();

			$('.smaller._1').height($('.smaller._1 #equipe_stages').height()+parseInt($('.smaller._1 #equipe_stages').css('margin-top'))+50);
		break;
		
	}
}

function concept_load(){
	define_positions();
	if(isMobile){
	
setTimeout(function(){$('.smaller._1 #text_content .content_title').removeClass('top');},150);
	
	}
}

function concept_resize(){
	define_positions();
	
}

$equipe_right = document.getElementById('equipe_stages');
$slide_1 = document.getElementById('text_content');
$slide_2 = document.getElementById('left_sliding_pic');
$slide_3 = document.getElementById('center_sliding_pic');
$slide_4 = document.getElementById('bottom_pic');

$q1 = document.getElementById('q1');
$q2 = document.getElementById('q2');
$q3 = document.getElementById('q3');
$q4 = document.getElementById('q4');

$text_visible = false;
$second_round = false;
$third_round = false;
$pic_panel_visible = false;

function concept_scroll(){
	if(action == "index"){
		if(!isMobile){
			if(30-(window.pageYOffset/25) > 0){
				$equipe_right.style[Modernizr.prefixed('transform')] = 'translate3d(0,'+(30-(window.pageYOffset/25))+'%, 0)';
	
			}
		}
		
		
		if(pageYOffset>$('#text_content').height()/2 && !$text_visible){
			$text_visible = true;
			$('.smaller._1 #text_content .content_title').removeClass('top');
			$('.smaller._1 #text_content .covered .cover').removeClass('hidden');
			setTimeout(function(){$('.smaller._1 #text_content .covered .content').removeClass('hidden');},50);
		}
		
		if(window.pageYOffset > $('.pic_panel').offset().top - $(window).height() + 200 && !$pic_panel_visible){
			$pic_panel_visible = true;
			$('.pic_panel > div:eq(0)').removeClass('hidden');
			setTimeout(function(){$('.pic_panel > div:eq(1)').removeClass('hidden');},50)
			setTimeout(function(){$('.pic_panel > div:eq(2)').removeClass('hidden');},100)
			setTimeout(function(){$('.pic_panel > div:eq(3)').removeClass('hidden');},150)
		}
		
		if(_pageY > $('#portraits_panel').offset().top  - $(window).height() + 200 && !$('#portraits_panel').hasClass('visible') ){			
			$('#portraits_panel .half:eq(0)').removeClass('left_translated');
			$('#portraits_panel .half:eq(1)').removeClass('right_translated');
			setTimeout(function(){
				$('#portraits_panel .half:eq(2)').removeClass('left_translated');
				$('#portraits_panel .half:eq(3)').removeClass('right_translated');
			},300)

		}

	} else {
		page_scroll();
	}

}

function page_scroll(){		
	if(!isMobile){		
	if((window.pageYOffset/2.5)<370){
				$equipe_right.style[Modernizr.prefixed('transform')] = 'translate3d(0,'+(370-(window.pageYOffset/2.5))+'px, 0)';
			}
	}
		
		
			if(pageYOffset>$('#text_content').height()/2 && !$text_visible){
			$text_visible = true;
			$('.smaller._1 #text_content .content_title').removeClass('top');
			$('.smaller._1 #text_content .covered .cover').removeClass('hidden');
			setTimeout(function(){$('.smaller._1 #text_content .covered .content').removeClass('hidden');},50);
		}
		
		if(pageYOffset>$('.smaller._2').offset().top - $(window).height() + 200 && !$second_round){
			$second_round = true;
			$('.smaller._2 .left .covered:eq(0) .cover').removeClass('hidden');
			setTimeout(function(){$('.smaller._2 .left .covered:eq(0) .content').removeClass('hidden');},50);
		}
		
		if($('.smaller._3').length != 0){
			if(pageYOffset>$('.smaller._3').offset().top - $(window).height() + 250 && !$third_round){
				$third_round = true;
				$('.smaller._2 .center .covered:eq(0) .cover').removeClass('hidden');
				setTimeout(function(){$('.smaller._2 .center .covered:eq(0) .content').removeClass('hidden');},50);
			}
			
		//$left_1.style[Modernizr.prefixed('transform')] = 'translate3d(0,'+(window.pageYOffset/10)+'px, 0)';
		//$left_2.style[Modernizr.prefixed('transform')] = 'translate3d(0,'+(window.pageYOffset/15)+'px, 0)';
			if(!isMobile){		
		if(action == "invitation" || action == "knowledge"){
			$slide_3.style[Modernizr.prefixed('transform')] = 'translate3d(0,'+($($slide_3).height()*1.3-(window.pageYOffset/5))+'px, 0)';
		} else {
			$slide_3.style[Modernizr.prefixed('transform')] = 'translate3d(0,'+(window.pageYOffset/15)+'px, 0)';
		}
		
		if(_pageY>$('.smaller._3').offset().top -$(window).height()-60){
		$slide_4.style[Modernizr.prefixed('transform')] = 'translate3d(0,'+(-$slide_4_height-(($('.smaller._3').offset().top - _window_height)-window.pageYOffset))/3+'px, 0)';

		}
			}
		}
		
		if(_pageY > $('#portraits_panel').offset().top  - $(window).height() + 200 && !$('#portraits_panel').hasClass('visible') ){			
			$('#portraits_panel .covered .cover').removeClass('hidden');
			setTimeout(function(){$('#portraits_panel .covered .content').removeClass('hidden');},50);
		}

	
}

