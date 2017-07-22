$(document).ready(function(){

  // $('.coded').css('height', $(this).innerHeight() + 'px');

  //Find the example elements
  var $jsTab = $('.tab-js-select'),
      $htmlTab = $('.tab-html-select'),
      $cssTab = $('.tab-css-select'),
      $jsCode = $('.tab-js'),
      $htmlCode = $('.tab-html'),
      $cssCode = $('.tab-css'),
      toggled = 'js';

  $jsTab.click(function(){
    if (toggled !== 'js') {
      $(this).toggleClass('tab-selected');
      $htmlTab.removeClass('tab-selected');
      $cssTab.removeClass('tab-selected');
      $htmlCode.fadeOut(50);
      $cssCode.fadeOut(50);
      $jsCode.fadeIn(50);
      toggled = 'js';
    }
  });

  $htmlTab.click(function(){
    if (toggled !== 'html') {
      $(this).toggleClass('tab-selected');
      $jsTab.removeClass('tab-selected');
      $cssTab.removeClass('tab-selected');
      $jsCode.fadeOut(50);
      $cssCode.fadeOut(50);
      $htmlCode.fadeIn(50);
      toggled = 'html';
    }
  });

  $cssTab.click(function(){
    if (toggled !== 'css') {
      $(this).toggleClass('tab-selected');
      $jsTab.removeClass('tab-selected');
      $htmlTab.removeClass('tab-selected');
      $jsCode.fadeOut(50);
      $htmlCode.fadeOut(50);
      $cssCode.fadeIn(50);
      toggled = 'css';
    }
  });

});
