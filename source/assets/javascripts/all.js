//= require vendor/zepto.min
//= require helper
//= require_self


/*
| -----------------------------------------------------------------------------
| MOBILE
| -----------------------------------------------------------------------------
*/
MBP.scaleFix();
MBP.startupImage();
MBP.preventZoom();
MBP.hideUrlBarOnLoad();

function get_time_difference(earlierDate,laterDate)
{
       var nTotalDiff = laterDate.getTime() - earlierDate.getTime();
       var oDiff = {};

       oDiff.days = Math.floor(nTotalDiff/1000/60/60/24);
       nTotalDiff -= oDiff.days*1000*60*60*24;

       oDiff.hours = Math.floor(nTotalDiff/1000/60/60);
       nTotalDiff -= oDiff.hours*1000*60*60;

       oDiff.minutes = Math.floor(nTotalDiff/1000/60);
       nTotalDiff -= oDiff.minutes*1000*60;

       oDiff.seconds = Math.floor(nTotalDiff/1000);

       return oDiff;

}





$(function() {




  var ask = $('.holder');
  var log = $('.log');
  var short_question = $('#short_question');
  var long_question = $('#long_question');
  var ask_time;
  var ask_time_start;
  var ask_time_finish;

  var timer;

  var stop_all = function() {
    short_question.get(0).volume = 0;
    short_question.get(0).currentTime = 0;
    short_question.get(0).pause();

    long_question.get(0).volume = 0;
    long_question.get(0).currentTime = 0;
    long_question.get(0).pause();
  };

  var play_sound = function(hold_time) {
    if(hold_time>0 && hold_time<=2) {
      log.html('');
      log.hide();
      // log.html('MiniBril, vai chover hoje?');
      short_question.get(0).play();
      short_question.get(0).volume = 1;
    }
    else if(ask_time>2 && ask_time<=15) {
      log.html('');
      log.hide();
      // log.html('MiniBril, como faz para tirar mancha de batom da camisa?');
      long_question.get(0).play();
      long_question.get(0).volume = 1;
    }
    else {
      clearInterval(timer);
      log.html('');
      log.hide();
      stop_all();
    }
  };

  ask.on('touchstart mousedown', function(e) {
    e.preventDefault();
    ask_time_start = new Date();
    ask.css({'background-color': 'rgba(0,0,0,0.3)'});

    timer = setInterval(function() {
      log.show();
      log.html(get_time_difference(ask_time_start, new Date()).seconds);
    });
  });

  ask.on('touchend mouseup', function(e) {
    e.preventDefault();
    clearInterval(timer);
    ask_time_finish = new Date();
    ask_time = get_time_difference(ask_time_start, ask_time_finish).seconds;
    play_sound(ask_time);
    ask.css({'background-color': 'transparent'});
  });




});