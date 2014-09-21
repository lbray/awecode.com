$(function(){

  var positions = []

  $('.content > .section').each(function(){
    var $this = $(this);
    var index = $this.index();

    positions[index] = {
      'top'     : $this.offset().top - 90,
      'left'     : $this.offset().left,
      position: "absolute"
    };
  });

   $('.content > .section').each(function(){
    var $this = $(this);
    var index = $this.index();
    $this.css(positions[index])
  });

   $(document).on('keyup', function(e){
      if(e.keyCode == 27){
        var index = $('.section.active').index();
        var position = positions[index];
        $('.section.active').css({top: position.top, left: position.left}).removeClass('active inactive');
        
        setTimeout(function(){
          $('.section').removeClass('active inactive').fadeIn(200)
        },500)
      }
   });

  $('.section').on('click', function(){
    var self = this;
    $('.section').not(self).removeClass('active').addClass('inactive');
    var offset = $(self).offset();
    $(self).addClass('active').css({top: 0, left: 0})
    setTimeout(function(){
      $('.section').not(self).fadeOut(200);
    },500)
  });

});