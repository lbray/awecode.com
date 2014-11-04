//        $(document).ready(function () {
//            $('.subMenu').smint({
//                'scrollSpeed': 1000
//            });
//        });

var $document = $(document);


function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
}

//function callback() {
//    console.log('hidden');
//}
//
//
//function fireIfElementVisible(el, callback) {
//    return function () {
//        if (!isElementInViewport(el)) {
//            callback();
//        }
//    }
//}

//var handler = fireIfElementVisible('nav', callback);


//$(window).on('DOMContentLoaded load resize scroll', handler);

var watch_scroll = function () {
    var $nav = $('nav');
    if ($document.scrollTop() != 0) {
        // move navbar programmatically as we are making it relative
        if ($nav.css('position') == 'fixed') {
            $nav.css('margin-top', '-' + $document.scrollTop() + 'px');
            $nav.css('position', 'relative');
        }
        if (!isElementInViewport($nav[0])) {
            $nav.addClass('top');
        }
        if (isElementInViewport($('.brand')[0])) {
            $nav.removeClass('top');
        }
    } else {
        $nav.css('position', 'fixed');
    }
}

$document.scroll(function () {
    watch_scroll();
});