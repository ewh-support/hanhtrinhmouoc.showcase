$(document).ready(function () {
    if ($('div').attr('rules-body') != undefined)
        var rules_top = $('.rules-body').offset().top - 200;

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= rules_top) {
            $('.rules-content').addClass('active');
        }
        else {
            $('.rules-content').removeClass('active');
        }
    });
});