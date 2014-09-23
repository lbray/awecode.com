$(function(){

    var esc_listener = function(e){
        if(e.keyCode == 27)
            open_home(true);
    }

    var open_panel = function(panel_name){
        var section = $('.section#'+panel_name);
        var title =  $(section.find('h1')[0]).text();
        //hide the section name
        $(section.find('h1')[0]).toggle();
        //show the section content/panel
        $(section.find('.panel')[0]).fadeIn(1300);
        //remove section click listener
        section.off('click');
        //add escape listener
        $(document).off('keyup')
        $(document).on('keyup', esc_listener);
        History.pushState({state:title}, 'Awecode | ' +title, '?'+title.toLowerCase());
    }

    var section_click_listener= function(){

        var self = this;
        $('.section').not(self).removeClass('active').addClass('inactive');
        var offset = $(self).offset();


        setTimeout(function(){
          $('.section').not(self).fadeOut(200, function(){
            $(self).addClass('active').css({top: 0, left: 0});
        });
      },500);
        // $(self).addClass('active').css({top: 0, left: 0});

        setTimeout(function(){
            open_panel($(self).attr('id'));
        },1600);

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

    var open_home = function(back){
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

        if (back){
            History.back();
        }
        //add section click handlers
        $('.section').off('click');
        $('.section').on('click', section_click_listener);
    }

    var init = function(){

        // Bind to StateChange Event
        History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
            var State = History.getState(); // Note: We are using History.getState() instead of event.state
        });

        absolutify();

        //add section click handlers
        $('.section').on('click', section_click_listener);


    }

    init();

});
