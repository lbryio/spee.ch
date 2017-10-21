function playOrPause(video){
    if (video.paused == true) {
        video.play();
    }
    else{
        video.pause();
    }
}

// if a video player is present, set the listeners
const video = document.getElementById('video-player');
if (video) {
    // add event listener for click
    video.addEventListener('click', ()=> {
        playOrPause(video);
    });
    // add event listener for space bar
    document.body.onkeyup = (event) => {
        if (event.keyCode == 32) {
            playOrPause(video);
        }
    };
}