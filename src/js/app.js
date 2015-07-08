//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {

    //page scroll function
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });


    //FitText for jumbotron title and subtitle
    $(".section-one h1").fitText(0.9, { minFontSize: '38px', maxFontSize: '63px' });

    // init wow.js
    wow = new WOW(
        {
            animateClass: 'animated',
            offset: 100
        }
    );
    wow.init();
});
