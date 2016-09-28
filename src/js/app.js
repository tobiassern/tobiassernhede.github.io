jQuery(function($) {
	var didScroll;

		var lastScrollTop = 0;
		var delta = 25;
		var headerHeight = $('#masthead').outerHeight();
		$(window).scroll(function(){
		    didScroll = true;
		});

		setInterval(function() {
		    if (didScroll) {
		        hasScrolled();
		        didScroll = false;
		    }
		}, 150);

		function hasScrolled() {
		    var st = $(this).scrollTop();

		    // Make sure they scroll more than delta
		    if(Math.abs(lastScrollTop - st) <= delta) {
		        return;
		    }

		    // If they scrolled down and are past the navbar, add class .nav-up.
		    // This is necessary so you never see what is "behind" the navbar.
		    if(st < headerHeight + 250) {
		    	$('body').removeClass('nav-not-top').addClass('nav-top');
		    } else {
		    	$('body').removeClass('nav-top').addClass('nav-not-top');
		    }

		    lastScrollTop = st;
		}
});