if ($(window).width() > 991) {
    $('video#player-100114').attr('src', 'https://hls.mediacdn.vn/thanhnien/2018/5/2/banner-updatelogo-convert-video-onlinecom-1525256714902667205316-7f718.mp4');
    setTimeout(function () {
        $('.video').addClass('hide');
        $('.video video').attr('autoplay', 'false');
        $('body').removeClass('hide');
        // Section 01
        $('.sec1 .info').addClass('show');
        $('.sec1 .info img').addClass('show');
        $('.sec1 .info h2.tt-01').addClass('show');
        $('.sec1 .info h6.tt-01').addClass('show');
        $('.sec1 .info p').addClass('show');
        $('.sec1 h4.tt-01').addClass('show');
        $('.sec1 .tt-02').addClass('show');
        $('.sec1 .time-frame').addClass('show');
    }, 12000);
}

var prize = 1846;
prize = $('.prize').offset().top - 400;
$(window).scroll(function () {
    if ($(window).scrollTop() > prize) {
        $('.sec2-img4').addClass('show');
        $('.sec2-img5').addClass('show');
        $('.sec2-img6').addClass('show');
        $('.sec2-img7').addClass('show');
        $('.sec2-img8').addClass('show');
        $('.sec2-img9').addClass('show');
        $('.sec2-img10').addClass('show');
        $('.sec2-img11').addClass('show');
        $('.sec2-img12').addClass('show');
    }
});

// Set the date we're counting down to
var countDownDate = new Date("Aug 12, 2018 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    // var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $('.time-frame > .date > .tt, .time-sp > ul > .date > .tt').html(days);
    $('.time-frame > .hour > .tt, .time-sp > ul > .hour > .tt').html(hours);
    $('.time-frame > .minute > .tt, .time-sp > ul > .minute > .tt').html(minutes);

    // If the count down is finished, write some text 
    if (distance < 0) {
        clearInterval(x);
        //document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);

setTimeout(function () {
    $('.time-sp').show();
}, 1100);


var $animation_elements = $('.text-animate');
var $window = $(window);

function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function () {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
            $element.addClass('in-view');
        } else {
            $element.removeClass('in-view');
        }
    });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

(function (angular) {
    'use strict';
    angular.module('app', [])
        .controller('homeCtrl', function ($scope, $rootScope, $window, $http) {

            //$('.list-blog-body button').click(function () {
            //    $('.list-blog-element').addClass('fadeInRight animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            //        $(this).removeClass('fadeInRight animated');
            //    });
            //});

            $scope.latestBlogList = [];
            $scope.onPrev = true;
            $scope.onNext = true;

            var page = 1;
            var ltr = true;
            var mobile = false;

            var loadPage = function () {
                $scope.onPrev = true;
                $scope.onNext = true;

                $http.post('/post/LatestPost', {
                    page: page
                }).then(function onSuccess(response) {
                    mobile = $(window).width() < 992;

                    if (mobile) {
                        $scope.latestBlogList = $scope.latestBlogList.concat(response.data.items);
                    } else {
                        $scope.latestBlogList = response.data.items;

                        var $class = ltr ? 'fadeInRight animated' : 'fadeInLeft animated';
                        $('.list-blog-element').addClass($class).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                            $(this).removeClass($class);
                        });
                    }

                    setTimeout(function () {
                        FB.XFBML.parse(document);
                    }, 500);
                    $scope.onPrev = response.data.prev;
                    $scope.onNext = response.data.next;

                });
            };
            loadPage();

            $scope.onprev = function () {
                ltr = false;
                page--;
                loadPage();
            }
            $scope.onnext = function () {
                ltr = true;
                page++;
                loadPage();
            }

            $(window).resize(function () {
                var m = $(window).width() < 992;
                if (mobile !== m) {
                    page = 1;
                    $scope.latestBlogList = [];
                    loadPage();
                }
            });
        });
})(angular);