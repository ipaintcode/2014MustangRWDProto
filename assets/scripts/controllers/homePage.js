require(
    [
        'assets/scripts/models/carousel.js'
    ],
    function (carousel) {
        'use strict';
        $(window).bind('load', function() {
            var newerCarousel = carousel;
            var $wrapper = $('.js-wrapper');
            var windowSize = $(window).outerWidth();
            var billboardCarouselWrapper = $('.js-billboard-carousel');
            var mediaCarouselWrapper = $('.js-media-carousel');
            var videoCarouselWrapper = $('.js-video-carousel');
            var standardCarouselWrapper = $('.js-standard-carousel');
            var tabsCarouseWrapper = $('.js-tabs-carousel');
            var listTabsCarouselWrapper = $('.js-tabs-list-carousel');

            var tabsViewIcon = $('.view-icon');

            standardCarouselWrapper.each(function () {
                var standardCarousel = new newerCarousel();
                var carousel = $(this);
                standardCarousel.largeCarousel($wrapper, carousel);
                standardCarousel.setUpPagingArrows();
                standardCarousel.setUpPagination();

            });

            tabsCarouseWrapper.each(function () {
                var tabsCarousel = new newerCarousel();
                var carousel = $(this);
                if (windowSize < 800) {
                    tabsCarousel.largeCarousel($wrapper, carousel, 2);
                    tabsCarousel.setUpPagingArrows();
                    tabsCarousel.setUpPagination();
                } else {
                    tabsCarousel.largeCarousel($wrapper, carousel, 4);
                    tabsCarousel.setUpPagingArrows();
                    tabsCarousel.setUpPagination();
                }
            });

            tabsViewIcon.each(function () {

                $(this).click(function (e) {

                    e.preventDefault();

                    var tabId = $(this).attr('href');

                    if ($(tabId + ':visible').length > 0) {
                        return false;
                    }

                    $('.view-icon').removeClass('active');

                    $('.tab-body').fadeOut('fast', function () {
                        $(tabId).fadeIn('slow');
                    });

                    $(this).addClass('active');

                    return false;

                });

            });

            setTimeout(function () { $('#multiple').hide(); }, 1000);

            listTabsCarouselWrapper.each(function () {
                var listTabsCarousel = new newerCarousel();
                var carousel = $(this);
                listTabsCarousel.largeCarousel($wrapper, carousel);
                listTabsCarousel.setUpPagingArrows();
                listTabsCarousel.setUpPagination();

            });

            billboardCarouselWrapper.each(function () {
                var billboardCarousel = new newerCarousel();
                var carousel = $(this);
                billboardCarousel.largeCarousel($wrapper, carousel);
                billboardCarousel.enableAutoScroll();
                //billboardCarousel.setUpPagingArrows();
                billboardCarousel.setUpPagination();
                billboardCarousel.setupHandlers();
                billboardCarouselWrapper.mouseover(billboardCarousel.onMouseOverHandler);
                billboardCarouselWrapper.mouseout(billboardCarousel.onMouseOutHandler);
            });

            mediaCarouselWrapper.each(function () {
                if (windowSize < 768) {
                    var mediaCarousel = new newerCarousel();
                    var carousel = $(this);
                    mediaCarousel.smallCarousel($wrapper, carousel);
                    mediaCarousel.setUpPagination();

                } else {
                    return false;
                }
            });

            videoCarouselWrapper.each(function () {
                if (windowSize < 800) {
                    var videoCarousel = new newerCarousel();
                    var carousel = $(this);
                    videoCarousel.smallCarousel($wrapper, carousel);

                } else {
                    var videoCarousel = new newerCarousel();
                    var carousel = $(this);
                    videoCarousel.smallCarousel($wrapper, carousel, 3);
                    videoCarousel.setUpPagingArrows();
                    videoCarousel.setUpPagination();

                }
            });
        });

    });
if ($(window).outerWidth() < 800) {
	require (
	[
		'assets/scripts/jquery.doubletap.js'
	], function (doubletap) {

	});
}
