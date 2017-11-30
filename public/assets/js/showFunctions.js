const showFunctions = {
    addPlayPauseToVideo: function () {
        const that = this;
        const video = document.getElementById('video-asset');
        if (video) {
            // add event listener for click
            video.addEventListener('click', ()=> {
                that.playOrPause(video);
            });
            // add event listener for space bar
            document.body.onkeyup = (event) => {
                if (event.keyCode == 32) {
                    that.playOrPause(video);
                }
            };
        }
    },
    playOrPause: function(video){
        if (video.paused == true) {
            video.play();
        }
        else{
            video.pause();
        }
    }
}