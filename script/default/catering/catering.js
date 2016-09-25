function catering_ready(){
	$('.card.long .square_link').bind('click',load_video);
}


function catering_load(){
	define_position();
	$('.center.floating').removeClass('hidden');
	setTimeout(function(){$('.center.floating .title_overflow > *').removeClass('top');},500);
}

function catering_resize(){
	define_position();

}

$center_sliding = document.getElementById('center_sliding');
$left_sliding = document.getElementById('left_sliding');
$right_sliding = document.getElementById('right_sliding');
$horizontal_left = document.getElementById('horizontal_left');
$text_content_visible = false;
$flowing_right = $('.flowing_right');
$flowingImgHeight =  $('.flowing_right > img').height();
$flowingOffset = $('.flowing_right').offset().top;
$cardOffset = $('.smaller._1 .left .card').offset().top;
$cardHeight = $('.smaller._1 .left .card').height();
$card_visible = false;

function catering_scroll(){
	
	if(pageYOffset > 50 && !$text_content_visible){
		$text_content_visible = true;
		$('#text_content .covered .cover').removeClass('hidden');
		setTimeout(function(){$('#text_content .covered .content').removeClass('hidden');},50);
		setTimeout(function(){$('.floating_content > .covered .cover').removeClass('hidden');},250);
		setTimeout(function(){$('.floating_content > .covered .content').removeClass('hidden');},300);

	}
	if(!isMobile){
		if(pageYOffset>0 && pageYOffset < $smaller2offset){
			$center_sliding.style[Modernizr.prefixed('transform')] = 'translate3d(0,'+(-window.pageYOffset/5)+'px, 0)';
			$left_sliding.style[Modernizr.prefixed('transform')] = 'translate3d(0,'+(window.pageYOffset/15)+'px, 0)';
			$right_sliding.style[Modernizr.prefixed('transform')] = 'translate3d(0,'+(-window.pageYOffset/4)+'px, 0)';
			$horizontal_left.style[Modernizr.prefixed('transform')] = 'translate3d('+(-80+(window.pageYOffset/15))+'px,0,0)';
		
		}
	}
	/*if(pageYOffset>0 && pageYOffset < $flowingImgHeight){
	//$('.flowing_right .cover')[0].style[Modernizr.prefixed('transform')] = 'translate3d(0,'+(-100+(100/$('.flowing_right').height())*pageYOffset)+'%,0)';
	//$('.flowing_right .content')[0].style[Modernizr.prefixed('transform')] = 'translate3d(0,'+(30-(30/$('.flowing_right').height())*pageYOffset)+'%,0)';
		if($flowing_right.height() <= $flowingImgHeight){
			//$flowing_right.height(pageYOffset);
		} else {
			$flowing_right.height($flowingImgHeight);
		}

	}*/
	
	
	
	
	
	
	
	if(pageYOffset>$cardOffset -$(window).height() + $cardHeight/2 && !$card_visible){
			$card_visible = true;
			$('.with_form  .form_input').each(function(i){
				 setTimeout(function(){$('.with_form .form_input:eq('+i+')').removeClass('left_translated')},(100*i));
			 })

	}
	
	


}

function define_position(){
	if(!isMobile){
		$('.smaller._2').height($('.smaller._2 .center .border_pic ').outerHeight());
		$('.smaller._3').height($('.smaller._3 .center .max_width ').height());
		$('.floating').css('left',($(window).width()-$('.floating').width())/2+'px');
	}
	$smaller2offset = $('.flat_pic_separator').offset().top;
	$flowingImgHeight =  $('.flowing_right > img').height();
	$flowingOffset = $('.flowing_right').offset().top
	$cardOffset = $('.smaller._1 .left .card').offset().top;
	$cardHeight = $('.smaller._1 .left .card').height();
}

function load_video(){
	$(this).unbind();
	$('.card.long .covered.pic .cover').addClass('hidden');
	setTimeout(function(){
		$('.card.long .covered.video .cover').removeClass('hidden');
		$('.card.long .covered.video').css('z-index',2);
	},800);
	setTimeout(function(){
		$('.card.long .video_player .rightHanded').append('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/SzmLlKyodxo?list=PLtgGbnDxV6WMSmdQDldQVVheI8pGCO2u8?VQ=1080&autoplay=1" frameborder="0" allowfullscreen></iframe>')
	},1100);
	
}

