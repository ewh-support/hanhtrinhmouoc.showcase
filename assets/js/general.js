$(document).ready(function () {
    $('.popup-show').click(function () {
        $('.popup').show();
    });
    $('.popup .btn-close').click(function () {
        $('.popup').hide();
    });

    $('header .ic-menu').click(function () {
        $('body').toggleClass('show-menu');
    });

    $('.dropdown').click(function () {
        $(this).find('+ .dropdown-menu').slideToggle();
    });

    $(window).resize(function () {
        if ($(window).width() > 991) $('body').removeClass('show-menu');
    });

    var body_height = $(window).height();
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 120) {
            $(".widget").addClass("fixed");
            $(".widget").css({ 'height' : (body_height - 20) + 'px'});
        }
        else {
            $(".widget").removeClass("fixed");
            $(".widget").css({ 'height': 'inherit' });
        }

        var bottom = $('body').height() - 810 - $('footer').height();
        if (scroll > bottom) {
            $(".widget").addClass("bottom");
            $(".widget").css({ 'bottom': ($('footer').height() + 80) + 'px'});
        }
        else {
            $(".widget").removeClass("bottom");
            $(".widget").css({ 'bottom': 'inherit' });
        }
    });

    $(window).trigger('resize');
    $(window).trigger('scroll');


    $.post('/Auth/IsAuthenticated', function (data, status) {
        if (data.IsAuthenticated)
            $('.login.logged').show();
        else {
            $('.login.logged').remove();
            $('.login').show();
        }
    });

    $('#nav').navActive();
    $('#m-nav').navActive();
});

$.fn.navActive = function () {
    var meta = $("meta[name=category]");
    $(this).find(" > li").removeClass("active");
    $(this).find(" > li > a").each(function () {
        if ($(this).attr('href').indexOf("/" + meta.attr("content")) >= 0 || $(this).attr('href').indexOf(window.location.pathname) >= 0) {
            $(this).closest("li").addClass("active");
            return false;
        }
        return true;
    });

    return this;
}
