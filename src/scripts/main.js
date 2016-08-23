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
    loop: true,
    autoplay: 6 * 1000
  });

  $(window).on("resize", function () {
    console.log("resize");
    fitHero();
  })

  $(".area-input").keypress(function(e) { 
    if (e.keyCode == 13){
        searchAddress();
    }    
  });

  $(".area-submit").click(function(e) { 
      searchAddress();
  });

  $(".area-seeall").click(function(e) {
    $('.area-allplace').toggleClass('closed')
  })
  $(".area-allplace .close").click(function(e) {
    $('.area-allplace').toggleClass('closed')
  })

  $('.area-place .closebox').click(function (e) {
    $(this).parent().addClass("closed")
  })
}

function fitHero () {
  var headerHeight = 95;
  var windowHeight = $(window).height();
  
  var $hero = $("#hero").height(windowHeight - headerHeight);
}

function searchAddress() {
  var text = $(".area-input")[0].value;
  if (!text || typeof text !== "string") return;

  // 맨뒤 단어가 동이라 가정
  var address = text.split(' ');
  var dong = address[address.length - 1];

  // 뒤에 "동" 추가
  if (dong[dong.length - 1] !== "동") {
    dong = dong + "동";
  }

  closePlaceEnable();
  closePlaceUnable();

  // 서비스 중이 아님
  if (CLaddresses.indexOf(dong) < 0) {
    showPlaceUnable();
  // 서비스 중임
  } else {
    showPlaceEnable();
  } 
}

function showPlaceEnable() {
  $('.area-place.enable').removeClass('closed')
}

function closePlaceEnable() {
  $('.area-place.unable').addClass('closed')  
}

function showPlaceUnable() {
  $('.area-place.unable').removeClass('closed')
}

function closePlaceUnable() {
  $('.area-place.unable').addClass('closed')
}


var CLaddresses = [
  "개포동",
  "논현동",
  "대치동",
  "도곡동",
  '삼성동',
  '세곡동',
  '수서동',
  '압구정동',
  '역삼동',
  '율현동',
  '일원동',
  '자곡동',
  '청담동',
  '내곡동',
  '반포동',
  '방배동',
  '서초동',
  '신원동',
  '양재동',
  '염곡동',
  '우면동',
  '원지동',
  '잠원동',

  '남현동',
  '봉천동',
  '신림동',

  '노량진동',
  '대방동',
  '동작동',
  '본동',
  '사당동',
  '신대방동',
  '흑석동',

  '당산동',
  '대림동',
  '도림동',
  '문래동',
  '신길동',
  '여의도동',
  '영등포동',
  '양평동',
  '양화동',
  
  '공덕동',
  '구수동',
  '노고산동',
  '당인동',
  '대흥동',
  '도화동',
  '동교동',
  '마포동',
  '망원동',
  '상수동',
  '상암동',
  '서교동',
  '성산동',
  '신공덕동',
  '신수동',
  '신정동',
  '아현동',
  '연남동',
  '염리동',
  '용강동',
  '중동',
  '창전동',
  '토정동',
  '하중동',
  '합정동',
  '현석동',

  '연희동',
  '신촌동',
  '청천동',
  '북아현동',

  '갈월동',
  '남영동',
  '도원동',
  '동빙고동',
  '동자동',
  '문배동',
  '보광동',
  '산천동',
  '서계동',
  '서빙고동',
  '신계동',
  '신창동',
  '용문동',
  '용산동',
  '이촌동',
  '이태원동',
  '주성동',
  '청암동',
  '청파동',
  '한남동',
  '효창동',
  '후암동',
  '한강로동',

  '광희동',
  '남대문로',
  '남산동',
  '남창동',
  '남학동',
  '다동',
  '만리동',
  '명동',
  '무교동',
  '무학동',
  '묵정동',
  '방산동',
  '봉래동',
  '북창동',
  '삼각동',
  '산림동',
  '서소문동',
  '소공동',
  '수표동',
  '수하동',
  '순화동',
  '신당동',
  '쌍림동',
  '예장동',
  '오장동',
  '을지로',
  '의주로',
  '인형동',
  '입정동',
  '장교동',
  '장충동',
  '저동',
  '정동',
  '주교동',
  '주자동',
  '중림동',
  '초동',
  '충무로',
  '충정로',
  '태평로',
  '필동',
  '황학동',
  '회현동',
  '흥인동',

  '금호동',
  '도선동',
  '마장동',
  '사근동',
  '상왕십리동',
  '성수동',
  '송정동',
  '옥수동',
  '용답동',
  '응봉동',
  '하왕십리동',
  '행당동',
  '홍익동'
]

// "alert()"
//  onClick=
//   onClick="alert('서비스 준비중입니다. 빠른 시일내로 찾아뵙겠습니다.')"