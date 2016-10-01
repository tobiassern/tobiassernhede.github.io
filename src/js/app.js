// @codekit-prepend "imagesloaded.pkgd.min.js";
// @codekit-prepend "masonry.pkgd.min.js";
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

	var $portfolioGrid = $('.portfolio-grid').masonry({
		itemSelector: '.portfolio-item-wrap',
		percentPosition: true,
		columnWidth: '.portfolio-item-wrap'
	});

	// Porfolio handling
	var PortfolioItem = function(data) {
		this.title = ko.observable(data.title);
		this.description = ko.observable(data.description);
	}

	var viewModel = {

	    portfolioItems: ko.observableArray([]),
	    loadPortfolio: function () {
	        var self = this;
	        $.getJSON("data/data.json",function (data) {
	                self.portfolioItems(data.portfolio);
	            }
	        );
	    },
    	renderedHandler: function (elements, data) {
    		$portfolioGrid.masonry( 'addItems', elements );
    		$portfolioGrid.imagesLoaded().progress( function() {
			  $portfolioGrid.masonry('layout');
			});
		}
	};

    ko.applyBindings(viewModel);
    viewModel.loadPortfolio();
});