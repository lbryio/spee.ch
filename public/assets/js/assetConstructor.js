const Asset = function () {
    this.data = {};
    this.addPlayPauseToVideo = function () {
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
    };
    this.playOrPause = function(video){
        if (video.paused == true) {
            video.play();
        }
        else{
            video.pause();
        }
    };
    this.showAsset = function () {
        this.hideAssetStatus();
        this.showAssetHolder();
        if (!this.data.src) {
            return console.log('error: src is not set')
        }
        if (!this.data.contentType) {
            return console.log('error: contentType is not set')
        }
        if (this.data.contentType === 'video/mp4') {
            this.showVideo();
        } else {
            this.showImage();
        }
    };
    this.showVideo = function () {
        console.log('showing video', this.data.src);
        const video = document.getElementById('video-asset');
        const source = document.createElement('source');
        source.setAttribute('src', this.data.src);
        video.appendChild(source);
        video.play();
    };
    this.showImage = function () {
        console.log('showing image', this.data.src);
        const asset = document.getElementById('image-asset');
        asset.setAttribute('src', this.data.src);
    };
    this.hideAssetStatus = function () {
        const assetStatus = document.getElementById('asset-status');
        assetStatus.hidden = true;
    };
    this.showAssetHolder =function () {
        const assetHolder = document.getElementById('asset-holder');
        assetHolder.hidden = false;
    };
    this.showSearchMessage = function () {
        const searchMessage = document.getElementById('searching-message');
        searchMessage.hidden = false;
    };
    this.showFailureMessage = function (msg) {
        console.log(msg);
        const searchMessage = document.getElementById('searching-message');
        const failureMessage = document.getElementById('failure-message');
        const errorMessage = document.getElementById('error-message');
        searchMessage.hidden = true;
        failureMessage.hidden = false;
        errorMessage.innerText = msg;
    };
    this.checkFileAndRenderAsset = function () {
        const that = this;
        this.isFileAvailable()
            .then(isAvailable => {
                if (!isAvailable) {
                    console.log('file is not yet available on spee.ch');
                    that.showSearchMessage();
                    return that.getAssetOnSpeech();
                }
            })
            .then(() => {
                that.showAsset();
            })
            .catch(error => {
                that.showFailureMessage(error);
            })
    };
    this.isFileAvailable = function () {
        console.log(`checking if file is available for ${this.data.claimName}#${this.data.claimId}`)
        const uri = `/api/file-is-available/${this.data.claimName}/${this.data.claimId}`;
        const xhr = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            xhr.open("GET", uri, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    const response = JSON.parse(xhr.response);
                    if (xhr.status == 200) {
                        console.log('isFileAvailable succeeded:', response);
                        if (response.message === true) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    } else {
                        console.log('isFileAvailable failed:', response);
                        reject('Well this sucks, but we can\'t seem to phone home');
                    }
                }
            };
            xhr.send();
        })
    };
    this.getAssetOnSpeech = function() {
        console.log(`getting claim for ${this.data.claimName}#${this.data.claimId}`)
        const uri = `/api/claim-get/${this.data.claimName}/${this.data.claimId}`;
        const xhr = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            xhr.open("GET", uri, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    const response = JSON.parse(xhr.response);
                    if (xhr.status == 200) {
                        console.log('getAssetOnSpeech succeeded:', response)
                        resolve(true);
                    } else {
                        console.log('getAssetOnSpeech failed:', response);
                        reject(response.message);
                    }
                }
            };
            xhr.send();
        })
    };
};