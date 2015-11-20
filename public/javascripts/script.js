$(document).ready(function () {
  // navbar active
  $('.navbar li').on("click",function() {
    $('.navbar li.active').removeClass('active');
    console.log('check active');
    var $this = $(this);
    if (!$this.hasClass('active')) {      
      $this.addClass('active');
    }
  });

  // $('#webdemo').on("click", function(){
  // 	alert("hello");
  // });

});