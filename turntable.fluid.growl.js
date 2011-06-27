// ==UserScript==
// @name		Turntable Growl
// @description What does this do?
// @include	 *
// @author	  Someone
// ==/UserScript==

$(function(){
    var getRoom = function(){
               if(turntable && turntable.WXhYRJcbeIUOlt){
                    return turntable.WXhYRJcbeIUOlt;
               }else{
                    return null;
               }
    };
    var getRoomManager = function(){
        var room = getRoom();
        if(room){
            return room.olmtyFzLJDfiqH;
        }
    };
    
	if(window.fluid){
		if(turntable){
			var currentSong = null;
			turntable.addEventListener("soundstart", function(event){
				var room = getRoom();
				if(room.currentSong && currentSong != room.currentSong){
					currentSong = room.currentSong;
					var songData = currentSong.metadata;

					var notification = {};
					notification.title = songData.song;
					notification.description  = "by " + songData.artist;
					
					if(songData.length){
						notification.description += " (";
						notification.description += [
							Math.floor(songData.length/60),
							(songData.length % 60 < 10 ? "0" : "") + Math.floor(songData.length % 60)
						].join(":");
						notification.description += ")";
					}
					
					if(songData.coverart){
						notification.icon = songData.coverart;
					}
					
					songData.onclick = function(){
						$("#btn_upvote").click();
					};
					
					fluid.showGrowlNotification(notification);
					console.log("Now playing: ", songData.song, " by ", songData.artist, " --- ", songData);
				}
			});
		}
	}
});
