webplayer = {

  init : function() {
    var sound        = new buzz.sound("interlude.mp3"),
        total_time   = document.getElementById("total_time"),
        play_button  = document.getElementById("play_button"),
        pause_button = document.getElementById("pause_button"),
        stop_button  = document.getElementById("stop_button");

    play_button.addEventListener("click",  function() { sound.play() });
    pause_button.addEventListener("click", function() { sound.pause() });
    stop_button.addEventListener("click",  function() { sound.stop() });

    sound.bind("timeupdate", function(e) {
      var timer = buzz.toTimer(this.getTime(), true);
      webplayer.update_current_position(e, sound);
    });

    sound.bind("loadedmetadata", function(e) {
      total_time.innerHTML = buzz.toTimer(this.getDuration())
    });

    seek_area.addEventListener("click", function(e) {
      webplayer.seek_to(e, sound)
    });
  },


  seek_to : function(e, sound) {
    var total_time    = sound.getDuration(),
        current_time  = sound.getTime(),
        seek_position = e.offsetX || e.layerX,
        seek_time     = Math.round( (seek_position * total_time) / 600 );

    sound.setTime(seek_time);
  },

  update_current_position : function(e, sound) {
    var current_time         = sound.getTime(),
        current_time_element = document.getElementById("current_time");

    current_time_element.innerHTML = buzz.toTimer(current_time, true);

    webplayer.update_playhead_position(current_time, sound);
  },

  update_playhead_position : function(current_time, sound) {
    var total_time        = sound.getDuration(),
        playhead_position = (current_time * 600) / total_time,
        playhead          = document.getElementById("playhead");

    playhead.style.left   = Math.round(playhead_position) + "px";
  },

}
