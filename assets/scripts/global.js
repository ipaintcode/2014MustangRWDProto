/* ---------------------------------------------------------------------
Global JavaScript

Target Browsers: All
Authors: Mark Spooner
------------------------------------------------------------------------ */

// Namespace Object
var NERD = NERD || {};
var APP = APP || {};

// Pass reference to jQuery and Namespace
(function($, APP) {

    // DOM Ready Function
    $(function() {
        APP.HasJS.init();
        APP.navToggle.init();
        APP.subNavToggle.init();
        APP.Resize.init();
        APP.Address.init();
        APP.FooterToggle.init();
        APP.NavStop.init();
    });

/* ---------------------------------------------------------------------
HasJS
Author: Boilerplate

Replaces "no-js" class with "js" on the html element if JavaScript
is present. This allows you to style both the JavaScript enhanced
and non JavaScript experiences.
------------------------------------------------------------------------ */
APP.HasJS = {
    init: function() {
        $('html').removeClass('no-js').addClass('js');
    }
};

APP.navToggle = {
    init: function() {
        $('a.navigation-menu-button').click(function() {
            $('div.js-menu').toggleClass('nav-shift');
            $('ul.navigation-list').toggleClass('nav-show');
            return false;
        });
    }
};

APP.subNavToggle = {
    hasInitialized: false,
    init: function() {
        $('.js-subnav .nav-sub').hide();
        $('a.nav-top').click(function(e) {
            // var $navTop = $(this).closest('.js-subnav').find('a.nav-top');
            // var $allSubNav = $(this).closest('ul').find('.nav-sub');
            // var $subNav = $(this).closest('li').find('.nav-sub');
            // $allSubNav.slideUp();
            // $navTop.removeClass('is-current');
            // $(this).addClass('is-current');
            // $subNav.not(':animated').slideDown();
            return false;
        });
        this.hasInitialized = true;
    }
};

APP.Resize = {
    init: function() {
        var viewportWidth = 0;
        var standardWidth = 1024;
        //Trying to limit resize listening to horiz change - TODO: make this work
        $(window).resize(function() {
            var $previousWidth = viewportWidth;
            viewportWidth = $(window).width();
            //console.log('Curr ' + viewportWidth);
            if (viewportWidth = $previousWidth) {
                return false;
            }
            else {
                if (viewportWidth > standardWidth) {
                    $('.navigation-foot').removeClass('js-subnav');
                    $('.navigation-foot .nav-sub').show();
                    $('.navigation-foot .nav-top').click(function() { return false; });
                }
                else {
                    $('.navigation-foot').addClass('js-subnav');
                    if(!APP.subNavToggle.hasInitialized) {
                        APP.subNavToggle.init();
                    }
                }
            }
        });
    }
};

APP.Address = {
    init: function() {
        $(".address-tag-mobile-a").on("click", function() {

            if ($('.mobile-address-popup').is(':visible') && $('.a').is(':visible')) {
                $('.mobile-address-popup').hide();
                $('.mobile-address-popup').empty();
            } else {
                $('.mobile-address-popup').empty();

                $('.a')
                    .clone()
                    .appendTo('.mobile-address-popup');

                    $('.mobile-address-popup').show();
            }

        });

        $(".address-tag-mobile-b").on("click", function() {

            if ($('.mobile-address-popup').is(':visible') && $('.b').is(':visible') ) {
                $('.mobile-address-popup').hide();
                $('.mobile-address-popup').empty();
            } else {
                $('.mobile-address-popup').empty();

                $('.b')
                    .clone()
                    .appendTo('.mobile-address-popup');

                    $('.mobile-address-popup').show();
            }

        });
    }
};

APP.FooterToggle = {
    init: function() {
        if ($('.footer-nav > ul').not(':visible')) {

            $('.footer-nav > li a').on('click', function(e) {
                var self = $(this);
                var $arrow = self.children('span');
                e.preventDefault();

                if (self.siblings().is(':visible')) {
                    $arrow.attr('class', 'footer-menu-arrow arrow-down');
                    self.siblings().slideUp();
                } else {
                    $arrow.attr('class', 'footer-menu-arrow arrow-up');
                    self.siblings().slideDown();
                }
            });
        }
    }
};

APP.NavStop = {
    init: function() {
        var self = this;

        $(window).scroll(function() {
            self.positionNav();
        });

        $(window).resize(function() {
            self.positionNav();
        });
    },

    positionNav: function() {
            var $nav = $('.navigation-wrapper');
            var navHeight = $nav.height();
            var docHeight = $('html').height();
            var footerHeight = $('.footer').height();
            var stopPosition = docHeight - footerHeight - navHeight - 57;

            $.fn.followTo = function( pos ) {
                var $this = this,
                    $window = $(window);

                    if ($window.scrollTop() > pos) {
                        $this.css({
                            position: 'absolute',
                            top: pos
                        });
                    } else {
                        $this.attr('style', '');
                    }
            };

            if ($(window).width() >= 1025) {
                $nav.followTo(stopPosition);
            } else {
                return;
            }

        }
};

}(jQuery, NERD));