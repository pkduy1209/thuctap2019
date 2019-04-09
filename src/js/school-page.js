const SchoolPage = (function() { // Anonymous function
  const initSchoolStripeSlider = function() {
    const $schoolStripeBlockSlider = $('#school-stripe-block-slider');
    if(!$schoolStripeBlockSlider.length) {
      return;
    }

    var mySwiper = new Swiper ($schoolStripeBlockSlider, {
      // Optional parameters
      loop: true,
      navigation: {
        nextEl: '.school-stripe-block .swiper-button-next',
        prevEl: '.school-stripe-block .swiper-button-prev',
      },
      pagination: {
        el: '.school-stripe-block .swiper-pagination',
        clickable: true,
      },
    })
  };

  const initSchoolCarouselSlider = function() {
    const $schoolCarouselBlockSlider = $('#school-carousel-block');
    if (!$schoolCarouselBlockSlider.length){
      return;
    }

    var swiper = new Swiper($schoolCarouselBlockSlider, {
      slidesPerView:  7,
      spaceBetween: 10,
      centeredSlides: false,
      clickable: true,
      loop: true,
      breakpoints: {
        1500:{
          slidesPerView: 6,
          spaceBetween: 5,
        },
        1250:{
          slidesPerView: 5,
          spaceBetween: 5,
        },
        950: {
          slidesPerView: 4,
          spaceBetween: 5,
        },
        360: {
          slidesPerView: 1,
          spaceBetween: 5,
        },
      },
      navigation: {
        nextEl: '.school-carousel-block .swiper-button-next',
        prevEl: '.school-carousel-block .swiper-button-prev',
      },
    });
  };

  const initSchoolStripeGrades =function() {
    const $objElSelectGallery = $('.show-galery-thumbs');    
    var $objElListGalleryTopItem, $curElSelectGallery;

    if (!$objElSelectGallery && !$elGroupGallery) {return;}

    var intIndexElSelectItem;    

    $objElSelectGallery.click(function(elElSelectItem){      
      $curElSelectItem = $(elElSelectItem['currentTarget']);
      intIndexElSelectItem = $curElSelectItem.index();

      $curElSelectGallery = $curElSelectItem.parent();
      $objElListGalleryTopItem = $curElSelectGallery.prev().children();
      $objElListGalleryTopItem.removeClass('show');

      $curElSelectGallery.children().removeClass('active');
      $($objElListGalleryTopItem[intIndexElSelectItem]).addClass('show');
      $curElSelectItem.addClass('active');      
    });

  };

  const initGameSlide = function (){
    const $objElSelectGame = $('.img-icon-game');
    const $elGroupGame = $('.info-game');

    if (!$objElSelectGame && !$elGroupGame){return;}

    var intIndexElSelectGameItem;
    const $objListGameItem = $elGroupGame.children();

    $objElSelectGame.click(function(elElSelectGameItem){
      $objElSelectGame.removeClass('active');
      $objListGameItem.removeClass('is-expand');

      $curElSelecGameItem = $(elElSelectGameItem['currentTarget']);  
      intIndexElSelectGameItem = $curElSelecGameItem.index();

      $curElSelecGameItem.addClass('active');
      $($objListGameItem[intIndexElSelectGameItem]).addClass('is-expand');
    });
  };

  return {
    init() {
      initGameSlide();
      initSchoolStripeGrades();
      initSchoolCarouselSlider();
      initSchoolStripeSlider();
    },
  };
})();

SchoolPage.init();