const commonExcuteScript = (() => {

  const _activeHambuGerMenu = () => {        
    const $hambugerMenuBtn = $('.hambuger-menu-btn');
    const $mobileMenu = $(".mobile-menu");

    if(!$hambugerMenuBtn || !$mobileMenu) { return; }

    $hambugerMenuBtn.click(function(){
      if($hambugerMenuBtn.hasClass('open')) {
        $hambugerMenuBtn.removeClass('open');
        $mobileMenu.removeClass('is-expended');
        
      }else {
        $hambugerMenuBtn.addClass('open');
        $mobileMenu.addClass('is-expended');
      }
    });
  }; // end _activeHambuGerMenu

  const _changeVideoFrame = () => {
    const $objElSelectSlider = $('.osmo-col');
    const $elGroupVideo = $('.osmo-playing-video');

    if(!$objElSelectSlider && !$elGroupVideo) {return;}

    var curElSelectSliderItem, intIndexElSelectSliderItem;
    const $objListVideoItem = $elGroupVideo.children();

    $objElSelectSlider.click(function(elElSelectSliderItem) {
      $objElSelectSlider.removeClass('active');
      $objListVideoItem.removeClass('show');

      curElSelectSliderItem = elElSelectSliderItem['currentTarget'];  
      intIndexElSelectSliderItem = $(curElSelectSliderItem).index();
      
      $(curElSelectSliderItem).addClass('active');
      $($objListVideoItem[intIndexElSelectSliderItem]).addClass('show');
    })
  };// end _changeVideoFrame

  const _sildeDownFaq = () => {
    const $slideDownHead = $('.section-link-head');
    var $slideDownBodyItem;

    $slideDownHead.click (function (elSlideDownHeadItem){
      let $questionAccordion = $(elSlideDownHeadItem.currentTarget).parent().find('.link-arrow-down');
      if($questionAccordion.hasClass('is-expand')){
        $questionAccordion.removeClass('is-expand');  
      }
      else {
        $questionAccordion.addClass('is-expand');
      };
      $slideDownBodyItem = $($(elSlideDownHeadItem.currentTarget).next());
      $slideDownBodyItem.slideToggle(400);    
    });
  };//end _slideDownFaq

  const _slideDownLearnMore = () => {
    const $learnMoreHead = $('.section-btn-head');
    const $learnMoreBody = $('.section-btn-body');
    let $learnMoreArrow = $('.section-btn-head').find('.arrow-down');
    $learnMoreHead.click (function (){
      if ($learnMoreArrow.hasClass('is-expand')){
        $learnMoreArrow.removeClass('is-expand')
      }
      else {
        $learnMoreArrow.addClass('is-expand')
      }
      $learnMoreBody.slideToggle(400);
    });
  };//end _slideDownLearnMore

  const _changeTabMenu =() => {
    const $objElSelectTab = $('.btn-change-tab');
    const $elTab = $('.tab-body-content');

    if (!$objElSelectTab && !$elTab) {return;}

    var curElSelectTab, intIndexElSelectTab;
    const $objTab = $elTab.children();


    $objElSelectTab.click(function(elElSelectTab){
      $objElSelectTab.removeClass('active-tab');
      $objTab.removeClass('is-expend');

      curElSelectTab = elElSelectTab['currentTarget'];
      intIndexElSelectTab = $(curElSelectTab).index();

      $(curElSelectTab).addClass('active-tab');
      $($objTab[intIndexElSelectTab]).addClass('is-expend')
    });

    

  };//end _changeTabMenu
  
  const _toggleMobileMenuGame =() =>{
    $btnGame = $('.btn-game');
    $listGame =$('.list-game-mobile');

    if(!$btnGame && ! $listGame) {return;}

    $btnGame.click(function(){
      $listGame.slideToggle('400')
    });
  };

  return {
    init() {
      _activeHambuGerMenu();
      _changeVideoFrame();
      _sildeDownFaq();
      _slideDownLearnMore();
      _changeTabMenu();
      _toggleMobileMenuGame();
    }
  }
})();

commonExcuteScript.init();