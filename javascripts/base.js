$(function(){

    var esc_listener = function(e){
        if(e.keyCode == 27)
            open_home();
    }

    var open_panel = function(panel_name){
        var section = $('.section#'+panel_name);
        //hide the section name
        $(section.find('h1')[0]).toggle();
        //show the section content/panel
        $(section.find('.panel')[0]).toggle();
        //remove section click listener
        section.off('click');
        //add escape listener
        $(document).on('keyup', esc_listener);
    }

    var section_click_listener= function(){
        var self = this;
        $('.section').not(self).removeClass('active').addClass('inactive');
        var offset = $(self).offset();
        $(self).addClass('active').css({top: 0, left: 0})
        setTimeout(function(){
          $('.section').not(self).fadeOut(200);
          open_panel($(self).attr('id'));
      },500)

    };

    var absolutify = function(){

        //global because open_home uses it
        positions = []

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
    }

    var open_home = function(){
        var index = $('.section.active').index();
        var position = positions[index];
        $('.section.active').css({top: position.top, left: position.left}).removeClass('active inactive');
        //hide all panels
        $('.section .panel').hide();
        $('.section h1').show();

        setTimeout(function(){
          $('.section').removeClass('active inactive').fadeIn(200)
      },500);
        //remove escape listener
        $(document).off('keyup');
    }

    var init = function(){
        absolutify();
        $('.section').on('click', section_click_listener);
    }

    init();

});
