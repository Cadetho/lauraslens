
String.prototype.filename=function(extension){
    var s= this.replace(/\\/g, '/');
    s= s.substring(s.lastIndexOf('/')+ 1);
    return extension? s.replace(/[?#].+$/, ''): s.split('.')[0];
}

$(document).scroll(function() {
	console.log("scrolled");
	var scrollPos = $(window).scrollTop(),
	temp_navbar = $('.navbar-fixed-top'),
	temp_icon = $('span.icon-logo');
	
	if(scrollPos>10) {
		temp_navbar.addClass('nav-scroll-change-color');
	} else {
		temp_navbar.removeClass('nav-scroll-change-color');
	}
});
$(document).ready(function() {
	$(window).on("load", function(){
	var gridwidth = $('.grid').width();
	var imgarray = [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	];
	var imglinks = [];
	$('.grid > div').each(function(){
		img = $(this).children()[0];
		imgwidth = $(img).width();
		imgheight = $(img).height();
		widthflag = 0;
		heightflag = 0;
		if(imgwidth < gridwidth*0.1){
			widthflag = 1;
			imgwidth = gridwidth*0.1;
			$(this).width(gridwidth*0.1);
			$(img).width(gridwidth*0.1);
		}else if(imgwidth < gridwidth*0.2){
			widthflag = 2;
			imgwidth = gridwidth*0.2;
			$(this).width(gridwidth*0.2);
			$(img).width(gridwidth*0.2);
		}else if(imgwidth < gridwidth*0.3){
			widthflag = 3;
			imgwidth = gridwidth*0.3;
			$(this).width(gridwidth*0.3);
			$(img).width(gridwidth*0.3);
		}else if(imgwidth < gridwidth*0.4){
			widthflag = 4;
			imgwidth = gridwidth*0.4;
			$(this).width(gridwidth*0.4);
			$(img).width(gridwidth*0.4);
		}else if(imgwidth < gridwidth*0.5){
			widthflag = 5;
			imgwidth = gridwidth*0.5;
			$(this).width(gridwidth*0.5);
			$(img).width(gridwidth*0.5);
		}
		
		if(imgheight<gridwidth*0.1){
			heightflag = 1;
			$(this).height(gridwidth*0.1);
		} else if(imgheight<gridwidth*0.2){
			heightflag = 2;
			$(this).height(gridwidth*0.2);
		} else if(imgheight<gridwidth*0.3){
			heightflag = 3;
			$(this).height(gridwidth*0.3);
		} else if(imgheight<gridwidth*0.4){
			heightflag = 4;
			$(this).height(gridwidth*0.4);
		} else if(imgheight<gridwidth*0.5){
			heightflag = 5;
			$(this).height(gridwidth*0.5);
		}
		
		imglinks.push({img: this, w: widthflag, h: heightflag});	
	});
	console.log(imglinks);
	});
	$('iframe#twitter-widget-0').ready(function(){
		facebook = $('div.fb-follow');
		facebook.height('28px');
		inWrapWidth = parseInt(facebook.css('margin-left').replace('px', '')) + 78*2;
		$('#button-inner-wrap').width(inWrapWidth);
		outWrapWidth = $('#button-wrapper').width();
		console.log(outWrapWidth + "    " + inWrapWidth);
		marginL = outWrapWidth/3 - inWrapWidth/2;
		marginR = 2*outWrapWidth/3 - inWrapWidth/2;
		$('#button-inner-wrap').css('margin-left', marginL).css('margin-right', marginR);
	});
	
	$("div#about-right-wrap").append($("div#button-wrapper"));
	$('#lightSliderHeadID-wrapper').addClass('scroll-section');
	$('div.about-wrapper').addClass('scroll-section');
	$('section.section-intro').addClass('scroll-section');

$("#lightSliderHeadID").lightSlider({
	item: 1,
	slideMove: 1,
	slideMargin: 0,
	mode: 'fade',
	cssEasing: 'ease',
	easing: '',
	speed: 1000,
	auto: false,
	loop: true,
	pause: 2000,
	pauseOnHover: false,
	controls: true,
	keyPress: true,
	adaptiveHeight: false,
	vertical: false,
	verticalHeight: 500,
	pager: false,
	gallery: false,
	galleryMargin: 15,
	thumbMargin: 5,
	enableTouch: true,
	enableDrag: true,
	onSliderLoad: function(el) {
		var slidecount = $('li.lslide').length;
		var x = 0;
		var result = new Array();
		result = getslidetext(slidecount, result);


		// $("#lightSliderHeadID li:nth-child(" + x + ")").append("<h1 class='slider-text'>" + output[0] + "</h1><h2 class='slider-text'>" + output[1] + "</h2>");
	},
	onAfterSlide: function (el) { 
	if(!($('li.lslide.active > h1').hasClass('slider-text-show'))){
		$('li.lslide.active > h1').toggleClass('slider-text-show');
		$('li.lslide.active > h2').toggleClass('slider-text-show');
	}
	},
	onBeforeSlide: function(el) {
	if(($('li.lslide.active > h1').hasClass('slider-text-show'))){
		$('li.lslide.active > h1').toggleClass('slider-text-show');
		$('li.lslide.active > h2').toggleClass('slider-text-show');
	}
	}

});
function getslidetext(slidecount, result){
	if(slidecount>0){
				$.ajax({
				url: 'user/themes/lauraslens/slidertext/slidertext.php',
				data: {slide: slidecount},
				type: 'post',
				success: function(output) {
					output = output.replace(/\n/g, ",").split(",");
					result.push(output);
					slidecount--;
					getslidetext(slidecount, result);
				}
				});
	}else{
		console.log(result);
		result.reverse();
		console.log(result);
		for(i=1;i<result.length+1;i++){
				$("#lightSliderHeadID li:nth-child(" + i + ")").append("<h1 class='slider-text'>" + result[i-1][0] + "</h1><h2 class='slider-text'>" + result[i-1][1] + "</h2>");
				var width = $("#lightSliderHeadID li:nth-child(" + i + ") > h1").width();
				$("#lightSliderHeadID li:nth-child(" + i + ") > h2").css("width", width*1.2);
				$("#lightSliderHeadID li:nth-child(" + i + ") > h1").css("width",  width*1.2);
				$("#lightSliderHeadID li:nth-child(" + i + ") > h1").css("border-top",  "2px solid white");
				$("#lightSliderHeadID li:nth-child(" + i + ") > h2").css("border-bottom", "2px solid white");
		}
		$('#lightSliderHeadID li:nth-child(1) > h1').toggleClass('slider-text-show');
		$('#lightSliderHeadID li:nth-child(1) > h2').toggleClass('slider-text-show');
	}
				
}

});
