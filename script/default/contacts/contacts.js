function contacts_ready(){
	$('#form_close').remove();
	show_booking_form();
	$('html,body').stop();
}


function contacts_load(){
	define_position();
	$('.center.floating').removeClass('hidden');
	setTimeout(function(){$('.center.floating .title_overflow > *').removeClass('top');},500);
	$(window).trigger('scroll');
}

function contacts_resize(){
	define_position();

}

$text_content_visible = false;
$center_sliding = document.getElementById('center_sliding');

function contacts_scroll(){
	if(!isMobile){
		if(pageYOffset>0 && pageYOffset < $smaller2offset){
			$center_sliding.style[Modernizr.prefixed('transform')] = 'translate3d(0,'+(-window.pageYOffset/5)+'px, 0)';
		}
	}
	
	
	if(pageYOffset > 50 && !$text_content_visible){
		$text_content_visible = true;
		$('#text_content .covered .cover').removeClass('hidden');
		setTimeout(function(){$('#text_content .covered .content').removeClass('hidden');},50);
		setTimeout(function(){$('.floating_content > .covered .cover').removeClass('hidden');},250);
		setTimeout(function(){$('.floating_content > .covered .content').removeClass('hidden');},300);

	}
	
	
	
	
	
	


}

function define_position(){
	$smaller2offset = $('.smaller._2').offset().top;
	if(!isMobile){$('.smaller._1').height($('#text_content').height())};
}

