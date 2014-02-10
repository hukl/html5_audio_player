webplayer = {

  init : function() {
    var player       = document.getElementById("webplayer");
    var seek_area    = document.getElementById("seek_area");
    var total_time   = document.getElementById("total_time");
    var play_button  = document.getElementById("play_button");
    var pause_button = document.getElementById("pause_button");
    var stop_button  = document.getElementById("stop_button");

    play_button.addEventListener("click",  function() { webplayer.play() });
    pause_button.addEventListener("click", function() { webplayer.pause() });
    stop_button.addEventListener("click",  function() { webplayer.stop() });

    player.addEventListener("timeupdate", function(e) {
      webplayer.update_current_position(e)
    });

    player.addEventListener("durationchange", function(e) {
      total_time.innerHTML = webplayer.format_time(player.duration)
    });

    seek_area.addEventListener("click", function(e) {
    });
  },

  play : function() {
    var player = document.getElementById("webplayer");

    player.play();
  },

  pause : function() {
    var player = document.getElementById("webplayer");

    player.pause();
  },

  stop : function() {
    var player = document.getElementById("webplayer");
    player.pause();
    player.currentTime = 0;
  },

  update_current_position : function(e) {
    var current_time_element = document.getElementById("current_time");
    var current_time         = e.srcElement.currentTime;

    current_time_element.innerHTML = webplayer.format_time(
      current_time
    );

    webplayer.update_playhead_position(current_time);
  },

  update_playhead_position : function(current_time) {
    var player            = document.getElementById("webplayer");
    var total_time        = player.duration;
    var playhead_position = (current_time * 600) / total_time;
    var playhead          = document.getElementById("playhead");

    playhead.style.left   = Math.round(playhead_position) + "px";
  },

  format_time : function(seconds) {
    var zero = '0', hours, minutes, seconds, time;

    time = new Date(0, 0, 0, 0, 0, seconds, 0);

    hh = time.getHours();
    mm = time.getMinutes();
    ss = time.getSeconds()

    // Pad zero values to 00
    hh = (zero+hh).slice(-2);
    mm = (zero+mm).slice(-2);
    ss = (zero+ss).slice(-2);

    time = hh + ':' + mm + ':' + ss;
    return time;
  }

}


