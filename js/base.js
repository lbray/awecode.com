//        $(document).ready(function () {
//            $('.subMenu').smint({
//                'scrollSpeed': 1000
//            });
//        });

var $document = $(document);

//if(!$(window).scrollTop()) { //abuse 0 == false :)
//  alert("You are at the top of this window");
//}

$document.scroll(function () {
    if ($document.scrollTop() >= 50) {
        console.log($document.scrollTop());
    } else {
        console.log($document.scrollTop());
    }
});