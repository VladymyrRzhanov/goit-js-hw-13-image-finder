export default jQuery(document).ready(function() {
  var btnToTop = $('#to-top');  
  $(window).scroll(function() {     
    if ($(window).scrollTop() > 400) {
       btnToTop.addClass('show');
     } else {
       btnToTop.removeClass('show');
     }
   });
   btnToTop.on('click', function(e) {
     e.preventDefault();
     $('html, body').animate({scrollTop:0}, '400');
   });
});