$(document).ready(function () {
    $('.sec2-img4').addClass('show');
    $('.sec2-img5').addClass('show');
    $('.sec2-img6').addClass('show');
    $('.sec2-img7').addClass('show');
    $('.sec2-img8').addClass('show');
    $('.sec2-img9').addClass('show');
    $('.sec2-img10').addClass('show');
    $('.sec2-img11').addClass('show');
    $('.sec2-img12').addClass('show');

    if ($('div').attr('gr-img-content') != undefined)
        var gr_img = $('.gr-img-content').offset().top - 400;
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= gr_img) {
            $('.gr-img-1').addClass('show');
            $('.gr-img-2').addClass('show');
            $('.gr-img-3').addClass('show');
            $('.gr-img-4').addClass('show');
            $('.gr-img-5').addClass('show');
            $('.qr-code').addClass('show');
            $('.rt-link').addClass('show');
        }
    });
});