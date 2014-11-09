function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
}

var watch_scroll = function () {
    //copying scroll top
    var scroll_top = $document.scrollTop() + 0;
    var $nav = $('nav');
    var nav_height_num = $('nav .inner')[0].getBoundingClientRect().height;
    var nav_height = nav_height_num + 'px';
    var sections = $('.section');
    $nav.css('height', nav_height);
    if (scroll_top != 0) {
//        move navbar programmatically as we are making it relative
        if ($nav.css('position') == 'fixed' && !$nav.hasClass('top')) {

            $nav.css('margin-top', '-' + scroll_top + 'px');
            $nav.css('position', 'relative');
        }

        if (!isElementInViewport($nav[0])) {
            $nav.addClass('top').css('margin', '0');
        }

//        if the navbar is on top but can go back to its place and fit above works section, send it there
        if ($('#works')[0].getBoundingClientRect().top >= $nav[0].getBoundingClientRect().height && $nav.hasClass('top')) {
            $nav.removeClass('top').css('margin', '0');
        }

        if (!isElementInViewport($nav[0])) {
            $nav.css('position', 'fixed');
        }

    } else {
        $nav.css('position', 'fixed');
    }


    sections.each(function () {
        var top = $(this).offset().top - nav_height_num,
            bottom = top + $(this).outerHeight();
        if (scroll_top >= top && scroll_top <= bottom) {
            $nav.find('a').removeClass('active');
            sections.removeClass('active');
            $(this).addClass('active');
            $nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
        }
    });

    if (isElementInViewport($('#map-canvas')[0])) {
        $nav.find('a').removeClass('active');
        sections.removeClass('active');
        $nav.find('a[href="#contact"]').addClass('active');
    }
}

$.fn.slideFadeToggle = function (speed, easing, callback) {
    this.css('bottom', '0');
    this.css('top', 'auto');
    this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, function () {
        $(this).css('top', '0');
        $(this).css('bottom', 'auto');
//        $(this).animate({top: '0', bottom: 'auto'}, 1000);
    });
    return this;
};


//smooth scrolling


var $document = $(document);
$document.scroll(function () {
    watch_scroll();
});

$document.ready(function () {

    $('nav input[type=checkbox]').change(function () {
        $('nav .small').slideFadeToggle();
    });

    $(function () {
        $('a[href*=#]:not([href=#])').click(function () {
            //hide overlay menu
            $('#show-menu').attr('checked', false);
            $('nav .small').slideFadeToggle();
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    function init_map() {
        var position = new google.maps.LatLng(27.686149, 85.331765);
        var map = new google.maps.Map(document.getElementById("map-canvas"), {zoom: 16, center: position, mapTypeId: google.maps.MapTypeId.ROADMAP});
        var marker = new google.maps.Marker({map: map, position: position});
    }

    google.maps.event.addDomListener(window, 'load', init_map);
});
