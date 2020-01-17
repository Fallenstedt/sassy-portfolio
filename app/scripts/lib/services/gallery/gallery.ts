const $ = require("jquery");
require("slick-carousel");

export function buildSlickGallery() {
  $(".gallery-container").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand",
    arrows: false,
    fade: true,
    asNavFor: ".gallery-nav"
  });

  $(".gallery-nav").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    asNavFor: ".gallery-container",
    dots: true,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}
