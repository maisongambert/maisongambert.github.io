var isHandheld =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var mobilePlatform = isMobile();
var isMobile = viewport().width < 740 || isMobile();
var supportsOrientationChange = "onorientationchange" in window, orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
var gallery_open = false;
var loadComplete = false;
var _pageY = 0;
var $portrait;


function check_portrait(){
	if(current!="gallery" && $('*:focus').length == 0){
		if(window.innerWidth > window.innerHeight){
			 $portrait = false;
				$('#rotation_advice').show();
				full_slider_setup();
				setTimeout(function(){$('#rotation_advice').removeClass('no_opacity')},1);		 
		} else {
			if(!$portrait){
				full_slider_setup();

			} 
			$portrait = true;
				
				setTimeout(function(){$('#rotation_advice').addClass('no_opacity')},1);		 
		}
	}
}

$(document).ready(function(){
	
	if(!isMobile){
		$('head').append('<meta name="viewport" content="width=1280">')
	} else {
		check_portrait();
		$('#logo').empty();
		$('#logo').append('<img src="/style/images/logo/logo.png" style="width:120%"/>');
		if(lang == "en"){
			$('#languages a').text('it');
		} else {
			$('#languages a').text('eng');
		}
	}

	
	$('#loading_cover').height($(window).height());
	
	if(!loadComplete){show_loading()};
	
		full_slider_setup();
	
	
	window[current+'_ready']();
	
	$(window).scroll(function(){
			_pageY = window.pageYOffset;
			global_scroll();
			window[current+'_scroll']();	
	});
	
	_window_height = $(window).height();
	_window_width = $(window).width();
	
	$('#menu_controller').bind('click',manage_menu);
	$('#book_table').bind('click',show_booking_form);
	

	
	$('#form_close').bind('click',close_booking_form);
	$('a:not(.no_link):not([target])').bind('click',linker);
	$('.send.no_link').bind('click',mailer);
	$('.alerter').click(function(){
		if(lang=="it"){
		alert('Il magazine sarà presto on line!')
		} else {
			alert('Our magazine will be online soon!')

		}
	});
	
	$('.credits').click(function(){
		if(lang=="it"){
		alert('Direzione creativa, storytelling webdesign & web development: Mediasoul, www.mediasoul.it')
		} else {
			alert('Creativity, storytelling webdesign & web development: Mediasoul, www.mediasoul.it')

		}
	});

});

$(window).load(function(){
	loadComplete = true;
	
	$('#loading .sorrento, #loading .maison_gambert').removeClass('has_transition_800').addClass('has_transition_400');
	setTimeout(function(){$('#loading .sorrento').addClass('no_opacity');},51);
	setTimeout(function(){$('#loading .maison_gambert').addClass('no_opacity');},1);
		$('#loading_cover').addClass('loaded');
		$('.locked').removeClass('locked');
	
		common_loads();

		window[current+'_load']();
	
	
	setTimeout(function(){
		$('#loading').remove();
	},2000)
	
	
	if($('#book_table').length != 0){
		$bookOffset = $('#book_table').offset().top;
	}
	
	
	
});

function common_loads(){
	if(current == "index"){
		setTimeout(function(){
			$('#menu_controller').removeClass('no_opacity');
		},1600);
		$('#menu_controller hr').each(function(i){
			setTimeout(function(){$('#menu_controller hr:eq('+i+')').removeClass('hidden');},1900 +(50*i));
		});
		
		setTimeout(function(){
			$('#socials').removeClass('hidden');
		},2000);
		
		$('#socials li').each(function(i){
			setTimeout(function(){$('#socials li:eq('+i+')').removeClass('top_double');},2300 +(50*i));
		});
		} else {
			setTimeout(function(){
				$('#menu_controller').removeClass('no_opacity');
			},900);
			$('#menu_controller hr').each(function(i){
				setTimeout(function(){$('#menu_controller hr:eq('+i+')').removeClass('hidden');},1200 +(50*i));
			});
			
			setTimeout(function(){
				$('#socials').removeClass('hidden');
			},1300);
			
			$('#socials li').each(function(i){
				setTimeout(function(){$('#socials li:eq('+i+')').removeClass('top_double');},1600 +(50*i));
			});
		}
}


$(window).resize(function(){
	
		window[current+'_resize']();
		_window_height = $(window).height();
		_window_width = $(window).width();
		if(!isMobile){
			full_slider_setup();
		}
		$('#loading_cover').height($(window).height());
		if($('#book_table').length != 0){
			$bookOffset = $('#book_table').offset().top;
		}
		
		if(isMobile){
			 check_portrait();
		}
	


})

function show_loading () {
	setTimeout(function(){
		$('#loading .p1_c1').addClass('p1_c1_loading');
		$('#loading .p1_c2').addClass('p1_c2_loading');
	},500)
	setTimeout(function(){
		$('#loading .p2_c1').addClass('p2_c1_loading');
		$('#loading .p2_c2').addClass('p2_c2_loading');
	},700)
	setTimeout(function(){
		$('#loading .maison_gambert').removeClass('top_double');
	},1100)
	setTimeout(function(){
		$('#loading .sorrento').removeClass('top_double');
	},1200);
}

function full_slider_setup() {
    if(current == "index"){
    	viewport_height = $(window).height() - 60;
    } else {
    	viewport_height = $(window).height() - 130;
    }
    
  
    
    viewport_width = $(window).width() - 60;
    
    if(isMobile){
    	if(current == "index"){
    		viewport_height = $(window).height() - 20;
    	} else {
        	viewport_height = $(window).height() - 95 - 110;
    	}
    	
    	 viewport_width = $(window).width() - 20;
    }
    
    screen_ratio = viewport_width / viewport_height;
    pic_ratio = 1420 / 922;

    $('.slider').height(viewport_height);

    if (pic_ratio > screen_ratio) {
        $('.slider .slide > img').css({
            height: viewport_height,
            width: Math.round(viewport_height * pic_ratio),
            marginLeft: Math.round(-(viewport_height * pic_ratio - viewport_width) / 2),
            marginTop: 0
        })
    } else {
        $(".slider .slide > img").css({
            width: viewport_width,
            height: Math.round(viewport_width / pic_ratio),
            marginTop: Math.round(-(viewport_width / pic_ratio - viewport_height) / 2),
            marginLeft: 0
        })
    }
    
    viewport_menu = $(window).height() - 60;
    
    if(isMobile){
    	viewport_menu = $(window).height() - 20;

    }
    
    menu_screen_ratio = viewport_width / viewport_menu;
    $('#menu_slider').height(viewport_menu);
    
    
    if (pic_ratio > menu_screen_ratio) {
        $('#menu_slider .slide > img').css({
            height: viewport_menu,
            width: Math.round(viewport_menu * pic_ratio),
            marginLeft: Math.round(-(viewport_menu * pic_ratio - viewport_width) / 2),
            marginTop: 0
        })
    } else {
        $("#menu_slider .slide > img").css({
            width: viewport_width,
            height: Math.round(viewport_width / pic_ratio),
            marginTop: Math.round(-(viewport_width / pic_ratio - viewport_menu) / 2),
            marginLeft: 0
        })
    }
};

$slides_wrap = document.getElementById('general_slide');
$bookTable = $('#book_table');
var $bookVisible = false;
var $bookOffset;


function global_scroll(){
	if(!isHandheld){
		$slides_wrap.style[Modernizr.prefixed('transform')] = 'translate3d(0,'+window.pageYOffset/3+'px, 0)';
	}
	if(_pageY > $bookOffset - _window_height + 200 && !$bookVisible) {
		$bookVisible = true;
		show_book_table();
	}
}

function show_logo_home () {
	
	$('#logo .p1').removeClass('hidden');
	
	setTimeout(function(){
		$('#logo .p2').removeClass('hidden');
	},50)
	setTimeout(function(){
		$('#logo .maison_gambert').removeClass('top_double');
	},400)
	setTimeout(function(){
		$('#logo .sorrento').removeClass('top_double');
	},500);
}

function hide_logo_home () {
		$('#logo *').addClass('no_transition');
		$('#logo .p1').addClass('hidden');
		$('#logo .p2').addClass('hidden');
		$('#logo .maison_gambert').addClass('top_double');
		$('#logo .sorrento').addClass('top_double');
		$('#logo *').removeClass('no_transition');
	
}

function manage_menu(){
	if(!$('#menu_controller').hasClass('opened')){
		open_menu();
	} else {
		close_menu();
	}
}

function open_menu () {
	$('#menu_bar').removeClass('hidden');
	$('#menu_controller').addClass('opened');
	$('#main_menu').removeClass('no_opacity');	
	$('#menu_pics').removeClass('hidden_by_scaleup');
	$('#languages a').removeClass('no_opacity');
	
	
	$('#menu_buttons ul li').each(function(i){
		setTimeout(function(){
			$('#menu_buttons ul li:eq('+i+')').removeClass('hidden');
		},100+(50*i));
		
		setTimeout(function(){
			$('#menu_buttons ul li:eq('+i+') a').removeClass('top');
		},600+(50*i))
	})
	
	
}

function close_menu(){
	if(((current == "index" && _pageY < 100 && !isMobile && !isHandheld) || current == "gallery")){
		$('#menu_bar').addClass('hidden');
	}
	
	$('#languages a').addClass('no_opacity');

	$('#menu_buttons ul li').css('pointer-events','none');
	$('#menu_controller').removeClass('opened');
	$('#menu_buttons ul li').each(function(i){
		setTimeout(function(){
			$('#menu_buttons ul li:eq('+i+') a').addClass('no_opacity');
		},(20*i));
		
		setTimeout(function(){
			$('#menu_buttons ul li:eq('+i+')').addClass('hidden');
		},100+(20*i));
	});
	
	setTimeout(function(){$('#menu_pics').addClass('hidden_by_scaleup');},800);
	setTimeout(function(){$('#main_menu').addClass('no_opacity');},800);
	setTimeout(function(){
		$('#menu_buttons ul li a').addClass('no_transition');
		$('#menu_buttons ul li a').removeClass('no_opacity');
		$('#menu_buttons ul li a').addClass('top');
		$('#menu_buttons ul li a').removeClass('no_transition');
		$('#menu_buttons ul li').css('pointer-events','all');
	},800)
}

function show_book_table (){
	$('#book_table .panel_title').removeClass('top');
	setTimeout(function(){
		$('#book_table .overflow_wrap img').removeClass('top');
	},50);
	setTimeout(function(){
		$('.long.separator').removeClass('hidden');
	},100);
	setTimeout(function(){
		$('#book_table .watch_ico').removeClass('hidden_by_scaling');
		$('#book_table .covered .cover').removeClass('hidden');
	},500);
	setTimeout(function(){
		$('#book_table .covered .content').removeClass('hidden');

	},550);	
}

book_sliding = false;

function show_booking_form(){
	if(!book_sliding){
		book_sliding = true;
		$('#form_table').removeClass('hidden');
		$('#form_close').removeClass('hidden_by_scaling');
		$('#form_table .h_left').removeClass('hidden');
		setTimeout(function(){
			$('#form_table .h_right').removeClass('hidden');
		},100);
		$("body,html").animate({
	         scrollTop: $('#form_table').offset().top-210
	     }, 1500, "easeOutQuint");
		 setTimeout(function(){
			 $(window).trigger('resize');

			 book_sliding = false;
		 },1200)
		 
		 setTimeout(function(){$('#form_table .h_left img').removeClass('top')},600);
		 setTimeout(function(){$('#form_table .h_left .play_title').removeClass('top')},650);
		 
		 $('#form_table .form_input').each(function(i){
			 setTimeout(function(){$('#form_table .form_input:eq('+i+')').removeClass('left_translated')},800+(100*i));
		 })
		 
		 setTimeout(function(){$('#form_table .h_right .covered .cover').removeClass('hidden')},0);
		 setTimeout(function(){$('#form_table .h_right .covered .content').removeClass('hidden')},50);

	}
}




function close_booking_form(){
	if(!book_sliding){
		
		$('#form_table').addClass('hidden');
		$('#form_close').addClass('hidden_by_scaling');
		if(current == "index"){
			$callSlide.style[Modernizr.prefixed('transform')] = 'translate3d(0,'+(-$callHeight-((callOffset - _window_height)-_pageY-865))/3+'px, 0)';
			callOffset = $('#call').offset().top-865;

	 }
		book_sliding = true;
		 setTimeout(function(){
			 $(window).trigger('resize');
			 $('#form_table .h_right .covered .cover').addClass('hidden');
			 $('#form_table .h_right .covered .content').addClass('hidden')
			 book_sliding = false;
			 $('#form_table .h_left').addClass('hidden');
				$('#form_table .h_right').addClass('hidden');
				$('#form_table .h_left img').addClass('top')
				$('#form_table .h_left .play_title').addClass('top');
				$('#form_table .form_input').addClass('left_translated');
	
	
		 },1200);
	}
}


function mailer(){
	$scope = $(this).parent();
	
	email = $('#mail').val();
	name = $('#name').val();
	date = $('#date').val();
	time = $('#time').val();
	guests = $('#guests').val();
	phone = $('#phone').val();
	message = $('#message').val();
	controller = current;

	
	
	prv = $('#prv');
	
	
	
	var email_reg_exp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;

	validating = true;
	
	$('.required',$scope).each(function(){
		if($(this).val() == "" || $(this).val() == undefined || $(this).val() == null){
			validating = false;
		}
	})
	
	if(!validating){
		switch(lang){
    	case 'en':
    		alert('Please fill all  fields!');
    	break;
    	case 'it':
    		alert('Si prega di compilare tutti i campi, grazie!');
    	break;
    	case 'fr':
    		alert('S\'il vous plaît, remplir tous les champs, merci!');
    	break;

    	}
		return false;
	} 
	
	
	
	if (!email_reg_exp.test(email)) {
		switch(lang){
    	case 'en':
    		alert('Please provide a valid email address!');
    	break;
    	case 'it':
    		alert('Si prega di inserire una mail valida grazie!');
    		break;
    	case 'it':
    		alert('S\'il vous plaît, entrer une adresse email valide, merci!');
    	break;

    	}
		$("#email").focus();
		return false;
	}
	
	if(message == ''){
		switch(lang){
    	case 'en':
    		alert('Please insert a message!');
    	break;
    	case 'it':
    		alert('Si prega di inserire il messaggio!');
    	break;
    	case 'fr':
    		alert('S\'il vous plaît entrer dans le message!');
    	break;

    	}
		$("#message").focus();
		return false;
	}
	
	if(!prv.prop('checked')){
		switch(lang){
    	case 'en':
    		alert('You should accept the privacy policy in order to contact us!');
    	break;
    	case 'it':
    		alert('Si prega di accettare i termini della privacy policy per poterci contattare!');
    	break;
    	case 'fr':
    		alert('S\'il vous plaît, accepter les termes de la privacy policy pour nous contacter!');
    	break;

    	}
		return false;
	}
	
	vars = $.param({"controller":controller,"name": name,"phone": phone,"email": email,"message":message,"guests": guests,"time": time,"date": date});

	
	$.ajax({
	      type: "POST",
	      url: "/mailer",
	      data: vars,
	      dataType: "json",
	      success: function(msg)
	      {
	    	   if(msg.message == '0'){
			        	switch(lang){
			        	case 'en':
			        		alert('Thank you! Your request has been submitted and we will contact you as soon as we can!');
			        	break;
			        	case 'it':
			        		alert('Grazie! La Vostra richiesta è stata inviata, Vi risponderemo appena possibile!');
			        		break;
			        	case 'fr':
			        		alert('Merci! Votre demande a été envoyée et nous vous répondrons dès que possible!');
			        	break;
			        	}
		        	$('input[type!="submit"][type!="reset"]').each(function(){
						/*if($(this).attr('id')!='prv'){
							$(this).val('');
						};*/
					});
		        	
		        	$('#prv').prop('checked',false);
		        	
		        } else if(msg.message == '1'){
		        	switch(lang){
		        	case 'en':
		        		alert('We are sorry, but there was a problem while processing your request, please try again later, thank you!');
		        	break;
		        	case 'it':
		        		alert('Nous sommes désolés mais il ya eu une erreur dans le traitement de votre demande, s\'il vous plaît essayer de nouveau plus tard, merci');
		        		break;

		        	}
		        	
		        }
	      }
	    }); 
}

function linker(e){
	e.preventDefault();
	
	if($fullscreen){
		exitFullScreen();
	}
	
	$('#loading_cover').removeClass('loaded');
	$url = $(this).attr('href');
	setTimeout(function(){
		window.location.href = $url;
	},600)
}

/*function button_hover (){
	if($('.blur',$(this)).length == 0){
		$this = $(this)
		$(this).find('.overflow_wrap').append('<p class="blur">'+$(this).find('a').text()+'</p>');
	}
}

function button_out(){
	$('.blur',$(this)).remove();
}
*/

var _mousemove;
var _click;
var _mouseenter;
var _mouseleve;
var _mousedown;
var _mouseup;

if (Modernizr.touchevents) {
	
    _mousemove = "touchmove";
    _click = "touchend";
    _mousedown = "touchstart";
    _mouseup = "touchend";
    _mouseenter = "mouseenter";
    _mouseleave = "mouseleave"
} else {
    _mousemove = "mousemove";
    _click = "click";
    _mousedown = "mousedown";
    _mouseup = "mouseup";
    _mouseenter = "mouseenter";
    _mouseleave = "mouseleave"
}

// dates //

var mesi = new Array();
   mesi[0] = "Gennaio";
   mesi[1] = "Febbraio";
   mesi[2] = "Marzo";
   mesi[3] = "Aprile";
   mesi[4] = "Maggio";
   mesi[5] = "Giugno";
   mesi[6] = "Luglio";
   mesi[7] = "Agosto";
   mesi[8] = "Settembre";
   mesi[9] = "Ottobre";
   mesi[10] = "Novembre";
   mesi[11] = "Dicembre";
   
var month = new Array();
   month[0] = "January";
   month[1] = "February";
   month[2] = "March";
   month[3] = "April";
   month[4] = "May";
   month[5] = "June";
   month[6] = "July";
   month[7] = "August";
   month[8] = "September";
   month[9] = "October";
   month[10] = "November";
   month[11] = "December";

var $fullscreen = false;

   function launchIntoFullscreen(element) {
   	  if(element.requestFullscreen) {
   	    element.requestFullscreen();
   	  } else if(element.mozRequestFullScreen) {
   	    element.mozRequestFullScreen();
   	  } else if(element.webkitRequestFullscreen) {
   	    element.webkitRequestFullscreen();
   	  } else if(element.msRequestFullscreen) {
   	    element.msRequestFullscreen();
   	  }
   	}


   function exitFullScreen()
   {
       if (document.exitFullscreen)
           document.exitFullscreen();
       else if (document.msExitFullscreen)
           document.msExitFullscreen();
       else if (document.mozCancelFullScreen)
           document.mozCancelFullScreen();
       else if (document.webkitExitFullscreen)
           document.webkitExitFullscreen();
   }