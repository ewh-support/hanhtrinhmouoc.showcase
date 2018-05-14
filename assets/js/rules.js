$(document).ready(function () {
    if ($('.rules-body').length) {
        var rules_top = $('.rules-body').offset().top - 100;
    }
    var running = false;

    $(window).scroll(function () {
        // selectors
        var $window = $(window),
            $body = $('body'),
            $panel = $('.section');

        var scroll = $window.scrollTop();
        if (scroll >= rules_top) {
            $('.rules-content').addClass('active');
        } else {
            $('.rules-content').removeClass('active');
        }

        if (scroll > 200) {
            $('.section__img__inner').css({
                'top': '0'
            });
        } else {
            $('.section__img__inner').css({
                'top': '2000px'
            });
        }

        // Change 22% earlier than scroll position so colour is there when you arrive.

        scroll = $window.scrollTop() + ($window.height() / 2);

        $('.section').removeClass('active');
        $panel.each(function () {
            var $this = $(this);

            // if position is within range of this panel.
            // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
            // Remember we set the scroll to 33% earlier in scroll var.
            if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
                $this.addClass('active');
            }
        });

    }).scroll();
});