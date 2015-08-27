var animatePoints = function () {
    
    var revealPoint = function () {
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translateY(0)'
        });
    };
    $.each($('.point'), revealPoint);
};



$(window).load(function () {
    if ($(window).height() > 950) {
        animatePoints();
    }
    $(window).scroll(function (event) {
        if ($(window).scrollTop() >= 500) {
            animatePoints();
        }
    });
});