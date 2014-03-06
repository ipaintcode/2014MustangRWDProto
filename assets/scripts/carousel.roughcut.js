$(window).load(function() {

    var totalIndex = $('#carousel .images li').length-1,
        currentIndex = 0,
        speed = 0;

    $('.carousel .images li').width(100/(totalIndex+1)+"%")


    function resetCarouselWidth() {
        $('#carousel').width($(window).width());
        var setY = ($(window).height()-$('#carousel .images').height())/2;
        $('.carousel').css("top", setY);
        setPosition(currentIndex);
        $('#carousel').css("height", $('#carousel .images li').height());
    }
    function setPosition(index) {
        var carouselWidth = $('#carousel .images').width();
        var itemWidth = $('#carousel .images li').eq(index).width();
        var setLeft = ($(window).width()-itemWidth)/2
        var offSet = $('#carousel .images li').eq(index).position().left;

        $('#carousel .images li').stop().animate({
            opacity: .2
        }, speed);
        $('#carousel .images li').eq(index).stop().animate({
            opacity: 1
        }, speed);
        $('.carousel .images').stop().animate({
            'left': setLeft-offSet
        }, speed);

        if(currentIndex == 0) {
            $('#carousel .left').css('opacity', '.2');
        } else {
            $('#carousel .left').css('opacity', '1');
        }

        if(currentIndex == totalIndex) {
            $('#carousel .right').css('opacity', '.2');
        } else {
            $('#carousel .right').css('opacity', '1');
        }

        speed = 300;
    }

    $(window).resize(function() {
        resetCarouselWidth();
    });


    function addEvents() {
        $('#carousel .left').click(function(event) {
            if(currentIndex > 0) {
                currentIndex-=1;
                setPosition(currentIndex)
            }
        });

        $('#carousel .right').click(function(event) {
            if(currentIndex < totalIndex) {
                currentIndex+=1
                setPosition(currentIndex)
            }
        });

        $('#carousel .left a').hover(function() {
            $(this).stop().animate({
                "paddingLeft": "30"
            });
        }, function() {
            $(this).stop().animate({
                "paddingLeft": "20"
            });
        });

        $('#carousel .right a').hover(function() {
            $(this).stop().animate({
                "paddingRight": "30"
            });
        }, function() {
            $(this).stop().animate({
                "paddingRight": "20"
            });
        });

        $('#carousel .images li').click(function(event) {
            if($(this).index() != currentIndex) {
                currentIndex = $(this).index();
                setPosition(currentIndex)

            }
        });

        $(document).keydown(function(e){
            if (e.keyCode == 37) {
               if(currentIndex > 0) {
                    currentIndex-=1
                    setPosition(currentIndex)
                }
            } else if (e.keyCode == 39) {
                if(currentIndex < totalIndex) {
                    currentIndex+=1
                    setPosition(currentIndex)
                }
            }
            if(e.keyCode == 70) {
                var elem = document.getElementById("carousel");
    req = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen;
    req.call(elem);
                resetCarouselWidth();
                setHeight();
                $('#carousel').css('top', "-100")
            }
        });
    }


    function setHeight() {
        var w = $(window).width();
        if(w >= 1200) {
             $('.carousel .images').css('width', '18000');
             $('.carousel .images').css('height', $('.carousel .images img').height());
             resetCarouselWidth()
        }

        if(w < 1200) {
             $('.carousel .images').css('width', '14000');
             $('.carousel .images').css('height', $('.carousel .images img').height());
             resetCarouselWidth()
        }

        if(w < 800) {
             $('.carousel .images').css('width', '10000');
             $('.carousel .images').css('height', $('.carousel .images img').height());
             resetCarouselWidth()
        }

        if(w < 640) {
             $('.carousel .images').css('width', '10000');
             $('.carousel .images').css('height', $('.carousel .images img').height());
             resetCarouselWidth()
        }

        if(w < 480) {
             $('.carousel .images').css('width', '5000');
             $('.carousel .images').css('height', $('.carousel .images img').height());
             resetCarouselWidth()
        }
    }

    $(window).resize(function() {
        setHeight();
        // $('nav').css("top", $('.carousel .images li').height())
    });

    // var startX,
    //     endX;

    // $("#carousel").hammer({

    // }).bind("dragstart", function(ev) {
    //     startX = $("#carousel ul").css('left');
    // })

    // $("#carousel").hammer({

    // }).bind("dragend", function(ev) {
    //     endX = ev.distanceX

    //     console.log(startX)
    // })

    // $("#carousel").hammer({

    // }).bind("drag", function(ev) {
    //     console.log(ev.distanceX);
    //     $("#carousel ul").css('left', startX-ev.distanceX);
    // });

    function buildCarousel(list) {
        $('body').prepend('<div id="carousel" class="carousel">');
        $('#carousel').prepend('<ul class="images">');
        $(list).each(function(index) {

            $('.images').append('<li class="carousel-item">')
            var src = $(this).find('img').attr('src');
            src = src.replace('thumbs', 'large')
            $('.carousel-item').eq(index).append('<img src="'+src+'"">');
            // $('.carousel-item img').css('visibility', 'hidden');
        });

        $('#carousel').append('<ul class="nav">');
        $('#carousel .nav').append('<li class="left"><a href="#">&lang;');
        $('#carousel .nav').append('<li class="right"><a href="#">&rang;');
        $('#carousel').css({
            width: $(window).width(),
            height: $(window).height()
        });
    }

    $('#items li').click(function(event) {
        event.preventDefault();
        console.log($(this).index())
        activateLightBox($(this).index(), $(this).parent().find('li'));
    });

    function activateLightBox(index , list) {

        var exist = $('#carousel').length;
        currentIndex = index;

        if (exist == 0) {

            buildCarousel(list);

            totalIndex = $('#carousel .images li').length-1;
            $('.carousel .images li').width(100/(totalIndex+2)+"%");

            setHeight();
            addEvents();

            $('#carousel').css({
                'width': $(window).width(),
                'opacity': 0
            }).stop().animate({"opacity": 1}, 300)
            $('#inner-wrap').css({
                'opacity': '.05'
            });
            $('body').css('backgroundColor', 'black');
        } else {
            $('#carousel').remove();
            $('#inner-wrap').css({
                 "backgroundColor": 'white',
                 'opacity': '1'
            });
            $('body').css('backgroundColor', 'white');
        }
    }
});