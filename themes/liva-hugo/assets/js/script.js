// Preloader js    
$(window).on('load', function () {
  $('.preloader').fadeOut(100);
});

(function ($) {
  'use strict';

  //  Search Form Open
  $('#searchOpen').on('click', function () {
    $('.search-wrapper').addClass('open');
  });
  $('#searchClose').on('click', function () {
    $('.search-wrapper').removeClass('open');
  });

  // recent post slider
  const recentPostSlider = $(".recent-post-slider");
  recentPostSlider.slick({
    infinite: true, // 循环滚动
    vertical: false, // 水平方向滑动，广告墙一般是水平滑动
    slidesToShow: 1, // 每次显示一篇文章
    slidesToScroll: 1, // 每次滚动一篇文章
    dots: true, // 显示导航点
    arrows: true, // 显示左右导航箭头
    prevArrow: $('.prev-arrow'),
    nextArrow: $('.next-arrow'),
    speed: 3500, // 數字愈大，滑動的速度愈慢
    adaptiveHeight: true, // 自动调整高度以适应内容
    responsive: [{
      breakpoint: 600,
      settings: {
        vertical: false, // 在小屏幕上保持水平滑动
        slidesToShow: 1, // 每次显示一篇文章
        slidesToScroll: 1 // 每次滚动一篇文章
      }
    }]
  });

  // 添加点击 dots 切换的事件处理
  recentPostSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    // 在这里可以添加自定义逻辑，比如动画或样式更新
  });


  // venobox initialize
  $('.venobox').venobox();

})(jQuery);