$(document).ready(function () {
  init();
})

function init() {
  fitHero();
  $('.alert-notyetopen').click(function (e) {
    e.preventDefault();
    alert('서비스 준비중입니다. 빠른 시일내로 찾아뵙겠습니다.');
  }) 

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

function fitHero () {
  var headerHeight = 95;
  var windowHeight = $(window).height();
  console.log("win height", windowHeight);
  var $hero = $("#hero").height(windowHeight - headerHeight);
}

// "alert()"
//  onClick=
//   onClick="alert('서비스 준비중입니다. 빠른 시일내로 찾아뵙겠습니다.')"