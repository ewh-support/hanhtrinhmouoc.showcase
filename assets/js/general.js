$(document).ready(function () {
    $('.popup-show').click(function () {
        $('.popup').show();
    });
    $('.popup .btn-close').click(function () {
        $('.popup').hide();
    });

    // Navigation bar
    $('header .ic-menu').click(function () {
        $('body').toggleClass('show-menu');
    });

    $('.dropdown').click(function () {
        $(this).find('+ .dropdown-menu').slideToggle();
    });

    $('header + div').on('click', function (e) {
        if ($(window).width() < 992) $('body').removeClass('show-menu');
    });

    // Widget
    $(window).resize(function () {
        if ($(window).width() >= 992) {
            $('body').removeClass('show-menu');
            $('.widget > .inner-widget > img').attr('src', '/img/general/widget-bao-thanh-nien.jpg');
        }
        else {
            $('.widget > .inner-widget > img').attr('src', '/img/general/widget-didong.jpg');
            $(".widget").css({ 'height': 'inherit' });
        }

        $(window).scroll();
    }).resize();

    var body_height = $(window).height();
    $(window).scroll(function () {
        
        if ($(window).width() < 992) return false;

        var scroll = $(window).scrollTop();
        if (scroll > 120) {
            $(".widget").addClass("fixed");
            $(".widget").css({ 'height': (body_height - 20) + 'px' });
        }
        else {
            $(".widget").removeClass("fixed");
            $(".widget").css({ 'height': 'inherit' });
        }

        var bottom = $('body').height() - 810 - $('footer').height();
        if (scroll > bottom) {
            $(".widget").addClass("bottom");
            $(".widget").css({ 'bottom': ($('footer').height() + 80) + 'px' });
        }
        else {
            $(".widget").removeClass("bottom");
            $(".widget").css({ 'bottom': 'inherit' });
        }
    }).scroll();

    // Authenticated
    // $.post('/Auth/IsAuthenticated', function (data, status) {
    //     if (data.IsAuthenticated) {
    //         $('.login.logged, .login-mobile.logged').show();
    //         $('.logoutForm img').attr('src', data.UserLogin.UserAvatarUri);
    //         $('.send-photo-body .avatar > img').attr('src', data.UserLogin.UserAvatarUri);
    //         $('.send-photo-body .author').html('Tác giả # ' + data.UserLogin.UserName);
    //     }
    //     else {
    //         $('.login.logged, .login-mobile.logged').remove();
    //         $('.login, .login-mobile').css({ 'display': 'inline-block' });
    //     }
    // });

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

// Vote
var VoteWidget = {
    settings: {
        $counter: $('.vote-count'),
        $btn: $('.vote-button'),
    },
    init: function () {
        VoteWidget.bind();
    },
    bind: function () {
        VoteWidget.settings.$btn.click(function () {
            if (!$(this).hasClass('complete')) {
                VoteWidget.bumpCount($(this).parent().find('.vote-count'));
            }
            $(this).toggleClass('complete');

            return false;
        });
    },
    bumpCount: function (voteCount) {
        //var current_count = voteCount.text();
        //count = parseInt(current_count);
        //if (isNaN(count)) count = 0;
        //count++;
        $.post('/Post/Vote', { id: voteCount.closest('ul').data('id') }, function (data, status) {
            if (data.success) {
                voteCount.toggleClass('bumped').text(data.count);
            }
            else {

            }
        });
    }
}

VoteWidget.init();