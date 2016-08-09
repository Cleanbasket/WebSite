$(document).ready(function () {
  
  console.log("main!");
  init();
})

function init() {
  fitHero();
  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    loop: true
  });


  $(window).on("resize", function () {
    console.log("resize");
    fitHero();
  })
}

function swiperInit () {

}
function fitHero () {
  var headerHeight = 95;
  var windowHeight = $(window).height();
  console.log("win height", windowHeight);
  var $hero = $("#hero").height(windowHeight - headerHeight);
}