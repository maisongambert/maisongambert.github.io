function __pageX(e) {
    if (Modernizr.touchevents) {
        return e.originalEvent.touches[0].pageX
    } else {
        return e.pageX
    }
}

function __pageY(e) {
    if (Modernizr.touchevents) {
        return e.originalEvent.touches[0].pageY
    } else {
        return e.pageY
    }
}

var mouse_initialX;
var mouse_deltaX;
var directionX;
var sections_initial_position;
var page_bind = false;
var treshold_gallery = 200;
var treshold_specials = 200;
var $url;


function gallery_ready(){
	$('.arrow_right').bind('click',go_next);
	$('.arrow_left').bind('click',go_prev);
	//$('#gallery_sections .section:eq(0)').addClass('active');
	//$('#gallery_sections .section').bind('click',change_set);
	  $("#fullscreen_gallery .gallery_slider").bind(_mousedown, start_gallery_drag);
	  
	 if(isMobile){
		
		$('body').on('doubletap',function(event){
			if(!$fullscreen){
				launchIntoFullscreen(document.getElementById('fullscreen_gallery'));
				$fullscreen = true;
			} else if($fullscreen){
				exitFullScreen();
				$fullscreen = false;
			}
			
		});
		
		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1;
		if(isAndroid) {
		 if(lang == "it"){
			 $('.rotate').text('ruota il telefono per visualizzare in modalità panorama, per visualizzare in fullscreen doppio tocco sulla foto, doppio tocco per uscire')
		 } else if(lang == "en"){
			 $('.rotate').text('rotate the device for landscape view, double-tap to go fullscreen, double-tap to exit')
		 }
		}
		 
		$('.arrow_left img').attr('src','/style/images/arrow_left_small.png');
		$('.arrow_right img').attr('src','/style/images/arrow_right_small.png');
		
		if(window.innerWidth > window.innerHeight){
			 $portrait = false;
			 $('.rotate').addClass('no_opacity');
			 $('#main_menu').addClass('landscape');
		} else {
			 $portrait = true;
				$('.rotate').removeClass('no_opacity');
				 $('#main_menu').removeClass('landscape');

		}
	 }
	 
	 

}


function gallery_load(){
	gallery_slider_setup();
	load_others();
	$('.pic_big:not(:first-child)').addClass('no_transition').css('transform','translate3d('+$(window).width()+'px,0,0)');
	setTimeout(function(){$('.pic_big:not(:first-child)').removeClass('no_transition');},500);
	setTimeout(function(){$('.rotate').addClass('no_opacity')},6000);

}

function gallery_resize(){
	
}

$(window).resize(function(){
	gallery_slider_setup();
	full_slider_setup();
	if(isMobile){
	if(window.innerWidth > window.innerHeight){
		 $portrait = false;
		 $('.rotate').addClass('no_opacity');
		 $('#main_menu').addClass('landscape');
	} else {
		 $portrait = true;
			$('.rotate').removeClass('no_opacity');
			 $('#main_menu').removeClass('landscape');

	}
	}
});



function gallery_scroll(){
	

}

function define_position(){
	
}

img_loaded = 0;

function load_others(){
	img_loaded++;
	if( $('.gallery_slider .pic_big:eq('+img_loaded+') img').is("[data-src]")){
		$('.gallery_slider .pic_big:eq('+img_loaded+') img').attr('src',$('.gallery_slider .pic_big:eq('+img_loaded+') img').attr('data-src')).removeAttr('data-src');
		$('.gallery_slider .pic_big:eq('+img_loaded+') img').imagesLoaded(function() {
			$('.gallery_slider .pic_big:eq('+img_loaded+') .loader').remove();
			load_others();
		});
		
	} else if($('.gallery_slider .pic_big:eq('+img_loaded+') img').is("[src]")){ 
		load_others();
	}
	
	
}


function gallery_slider_setup() {
	viewport_height = $(window).height();
    viewport_width = $(window).width();
    screen_ratio = viewport_width / viewport_height;
    pic_ratio = 1920 / 1150;

    $('.gallery_slider .pic_big').height(viewport_height);

    if (pic_ratio > screen_ratio) {
        $('.gallery_slider .pic_big > img').css({
            height: viewport_height,
            width: Math.round(viewport_height * pic_ratio),
            marginLeft: Math.round(-(viewport_height * pic_ratio - viewport_width) / 2),
            marginTop: 0
        })
    } else {
        $(".gallery_slider .pic_big > img").css({
            width: viewport_width,
            height: Math.round(viewport_width / pic_ratio),
            marginTop: Math.round(-(viewport_width / pic_ratio - viewport_height) / 2),
            marginLeft: 0
        })
    }
    
    $('.pic_big').addClass('no_transition');
    $('.pic_big.active').css('z-index',1).siblings().css('z-index',2);
    $(".pic_big.active").nextAll().css("transform","translate3d("+_window_width+"px, 0, 0)");
    $(".pic_big.active").prevAll().css("transform","translate3d("+(-_window_width)+"px, 0, 0)");
};

function start_gallery_drag(e) {
    e.preventDefault();
    $('.pic_big,#numbers,#numbers .num,#numbers .num p').addClass('no_transition');
    $('.pic_big.active').css('z-index',1).siblings().css('z-index',2);
    $(".pic_big.active").nextAll().css("transform","translate3d("+_window_width+"px, 0, 0)");
    $(".pic_big.active").prevAll().css("transform","translate3d("+(-_window_width)+"px, 0, 0)");

    $(window).bind(_mouseup, stop_gallery_drag);
    mouse_deltaX = 0;
    $("#fullscreen_gallery .gallery_slider").bind(_mousemove, move_gallery);
    mouse_initialX = __pageX(e);
   
    sections_initial_position = 0;
    return false;
}

function stop_gallery_drag(e) {
    e.preventDefault();
    $(window).unbind(_mouseup);
    $('.pic_big').removeClass('no_transition');
    $("#fullscreen_gallery .gallery_slider").unbind(_mousemove);
    $("#fullscreen_gallery .gallery_slider").stop();
    if (mouse_deltaX > treshold_gallery && directionX == "left") {
        if ($("#fullscreen_gallery .pic_big.active").next().length != 0) {
            slide_next();
        } else {
            $("#fullscreen_gallery .pic_big.active").css("transform","translate3d(0, 0, 0)");

        }
    }
    if (mouse_deltaX > treshold_gallery && directionX == "right") {
        if ($("#fullscreen_gallery .pic_big.active").prev().length != 0) {
           slide_prev();
        } else {
            $("#fullscreen_gallery .pic_big.active").css("transform","translate3d(0, 0, 0)");

        }
    } else if (mouse_deltaX < treshold_gallery) {
        $("#fullscreen_gallery .pic_big.active").css("transform","translate3d(0, 0, 0)");
        $("#fullscreen_gallery .pic_big.active").next().css("transform","translate3d("+_window_width+"px, 0, 0)");
        $("#fullscreen_gallery .pic_big.active").prev().css("transform","translate3d("+(-_window_width)+"px, 0, 0)");
      



    }

}

function move_gallery(e) {
    e.preventDefault();
    if (__pageX(e) > mouse_initialX) {
        mouse_deltaX = __pageX(e) - mouse_initialX;
        directionX = "right";
    } else if (__pageX(e) < mouse_initialX) {
        directionX = "left";
        mouse_deltaX = mouse_initialX - __pageX(e)

    }
    if (directionX == "right") {
        sections_current_position = sections_initial_position + mouse_deltaX
        $("#fullscreen_gallery .pic_big.active").prev().css("transform","translate3d("+(-_window_width+mouse_deltaX/1.5) + "px, 0, 0)");
        $("#fullscreen_gallery .pic_big.active").next().css("transform","translate3d("+(_window_width+mouse_deltaX/1.5) + "px, 0, 0)");
     


    } else {
        sections_current_position = sections_initial_position - mouse_deltaX
        $("#fullscreen_gallery .pic_big.active").next().css("transform","translate3d("+(_window_width-mouse_deltaX/1.5) + "px, 0, 0)");
        $("#fullscreen_gallery .pic_big.active").prev().css("transform","translate3d("+(-_window_width-mouse_deltaX/1.5) + "px, 0, 0)");
      



    }
    $("#fullscreen_gallery .pic_big.active").css("transform","translate3d("+sections_current_position/3 + "px, 0, 0)");


    return false;
}

function slide_next() {
    if ($(".gallery_slider .pic_big.active").next().length != 0) {
        $(".gallery_slider .pic_big.active").css("transform","translate3d("+(-_window_width/3)+"px, 0, 0)").removeClass("active").next().addClass("active");
        $("#fullscreen_gallery .pic_big.active").css("transform","translate3d(0, 0, 0)");
        $new_section = $(".gallery_slider .pic_big.active").attr('set');
        $old_section = $(".gallery_slider .pic_big.active").prev().attr('set');
        if($new_section != $old_section){
        	change_section();
        }
    }
    
    
    $(".full_arrow_left").removeClass('hidden_by_scaling');
    if ($(".gallery_slider .pic_big.active").index() == $(".gallery_slider .pic_big").length - 1) {
        $(".full_arrow_right").addClass('hidden_by_scaling');
    }
    
    
  
}

function slide_prev() {
    if ($(".gallery_slider .pic_big.active").prev().length != 0) {
    	 $(".gallery_slider .pic_big.active").css("transform","translate3d("+_window_width/3+"px, 0, 0)").removeClass("active").prev().addClass("active");
         $("#fullscreen_gallery .pic_big.active").css("transform","translate3d(0, 0, 0)");
         $new_section = $(".gallery_slider .pic_big.active").attr('set');
         $old_section = $(".gallery_slider .pic_big.active").next().attr('set');
         if($new_section != $old_section){
         	
         	change_section();
         }
       
    }
    $(".full_arrow_right").removeClass('hidden_by_scaling');
    
    if ($(".gallery_slider .pic_big.active").index() == 0) {
        $(".full_arrow_left").addClass('hidden_by_scaling');
    }
   
    	
    
    
    
    
}

function go_next(){
		$('.pic_big').addClass('no_transition');
	    $('.pic_big.active').css('z-index',1).siblings().css('z-index',2);
	    $(".pic_big.active").nextAll().css("transform","translate3d("+_window_width+"px, 0, 0)");
	    $(".pic_big.active").prevAll().css("transform","translate3d("+(-_window_width)+"px, 0, 0)");
	    setTimeout(function(){
	    	$('.pic_big').removeClass('no_transition');
	    	  slide_next();
	    },20);
	  
}

function go_prev() {
	$('.pic_big').addClass('no_transition');
    $('.pic_big.active').css('z-index',1).siblings().css('z-index',2);
    $(".pic_big.active").nextAll().css("transform","translate3d("+_window_width+"px, 0, 0)");
    $(".pic_big.active").prevAll().css("transform","translate3d("+(-_window_width)+"px, 0, 0)");
    setTimeout(function(){
    $('.pic_big').removeClass('no_transition');
    slide_prev();
    },20);
}

function change_section(){
	$('#gallery_sections .section').removeClass('active');
	$('#gallery_sections .section[rel='+$new_section+']').addClass('active');
	$('.gallery_title').addClass('top');
	setTimeout(function(){
		$('.gallery_title').text($('#gallery_sections .section.active').text());
		$('.gallery_title').removeClass('top');
	},400)	
}

function change_set(){
$new_set = $(this).attr('rel');
$('.pic_big').addClass('no_transition');

	if($(".pic_big[set="+$new_set+"]:eq(0)").index('.pic_big') > $('.pic_big.active').index('.pic_big')){
	    $('.pic_big.active').css('z-index',1).siblings().css('z-index',2);
	    $(".pic_big[set="+$new_set+"]:eq(0)").nextAll().css("transform","translate3d("+_window_width+"px, 0, 0)");
	    $(".pic_big[set="+$new_set+"]:eq(0)").prevAll(':not(.active)').css("transform","translate3d("+(-_window_width)+"px, 0, 0)");
	   
	} else {
		 $('.pic_big.active').css('z-index',1).siblings().css('z-index',2);
		  $(".pic_big[set="+$new_set+"]:eq(0)").nextAll(':not(.active)').css("transform","translate3d("+_window_width+"px, 0, 0)");
		    $(".pic_big[set="+$new_set+"]:eq(0)").prevAll().css("transform","translate3d("+(-_window_width)+"px, 0, 0)");
	}
	
	 setTimeout(function(){
	    	$('.pic_big').removeClass('no_transition');
	    	slide_to();
	    },1);
}

function slide_to(){
	if($(".pic_big[set="+$new_set+"]:eq(0)").index('.pic_big') > $('.pic_big.active').index('.pic_big')){
        $old_section = $(".gallery_slider .pic_big.active").attr('set');
		$(".gallery_slider .pic_big.active").css("transform","translate3d("+(-_window_width/3)+"px, 0, 0)").removeClass("active");
		 $(".pic_big[set="+$new_set+"]:eq(0)").addClass("active");
	        $("#fullscreen_gallery .pic_big.active").css("transform","translate3d(0, 0, 0)");
	        $new_section = $(".gallery_slider .pic_big.active").attr('set');
	        if($new_section != $old_section){
	        	change_section();
	        }
	} else {
        $old_section = $(".gallery_slider .pic_big.active").attr('set');

		 $(".gallery_slider .pic_big.active").css("transform","translate3d("+_window_width/3+"px, 0, 0)").removeClass("active");
		 $(".pic_big[set="+$new_set+"]:eq(0)").addClass("active");
         $("#fullscreen_gallery .pic_big.active").css("transform","translate3d(0, 0, 0)");
         $new_section = $(".gallery_slider .pic_big.active").attr('set');
         if($new_section != $old_section){
         	
         	change_section();
         }
	}
}

(function($){

	  $.event.special.doubletap = {
	    bindType: 'touchend',
	    delegateType: 'touchend',

	    handle: function(event) {
	      var handleObj   = event.handleObj,
	          targetData  = jQuery.data(event.target),
	          now         = new Date().getTime(),
	          delta       = targetData.lastTouch ? now - targetData.lastTouch : 0,
	          delay       = delay == null ? 300 : delay;

	      if (delta < delay && delta > 30) {
	        targetData.lastTouch = null;
	        event.type = handleObj.origType;
	        ['clientX', 'clientY', 'pageX', 'pageY'].forEach(function(property) {
	          event[property] = event.originalEvent.changedTouches[0][property];
	        })

	        // let jQuery handle the triggering of "doubletap" event handlers
	        handleObj.handler.apply(this, arguments);
	      } else {
	        targetData.lastTouch = now;
	      }
	    }
	  };

	})(jQuery);