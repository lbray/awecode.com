var $document = $(document);

var sl = function (o) {
    if (window.console) {
        console.log(o);
    } else {
        alert(o);
    }
}


function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
}


//$(window).on('DOMContentLoaded load resize scroll', handler);

var watch_scroll = function () {
    //copying scroll top
    var scroll_top = $document.scrollTop() + 0;
    var $nav = $('nav');
    var nav_height = $('nav .inner')[0].getBoundingClientRect().height + 'px';
    $nav.css('height', nav_height);
    if (scroll_top != 0) {
        // move navbar programmatically as we are making it relative
        if ($nav.css('position') == 'fixed') {
            $nav.css('margin-top', '-' + scroll_top + 'px');
            $nav.css('position', 'relative');
        }
        if (!isElementInViewport($nav[0])) {
            $nav.addClass('top');
        }
        // if the navbar is on top but can go back to its place and fit above works section, send it there
        if ($('.works')[0].getBoundingClientRect().top >= $('nav')[0].getBoundingClientRect().height && $nav.hasClass('top')) {
            $nav.removeClass('top').css('margin', '0');
        }
        if (!isElementInViewport($nav[0])) {
            $nav.css('position', 'fixed');
        }
    } else {
        $nav.css('position', 'fixed');
    }

}

$document.scroll(function () {
    watch_scroll();
});