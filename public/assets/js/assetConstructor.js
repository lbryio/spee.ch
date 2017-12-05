const Asset = function () {
    this.state = {};
    this.setState = function(key, value) {
        this.state[key] = value;
    };
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
        if (!this.state.src) {
            return console.log('error: src is not set')
        }
        if (!this.state.contentType) {
            return console.log('error: contentType is not set')
        }
        if (this.state.contentType === 'video/mp4') {
            this.showVideo();
        } else {
            this.showImage();
        }
    };
    this.showVideo = function () {
        console.log('showing video', this.state.src);
        const video = document.getElementById('video-asset');
        const source = document.createElement('source');
        source.setAttribute('src', this.state.src);
        video.appendChild(source);
        video.play();
    };
    this.showImage = function () {
        console.log('showing image', this.state.src);
        const asset = document.getElementById('image-asset');
        asset.setAttribute('src', this.state.src);
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
    this.checkClaimAvailability = function () {
        const that = this;
        const uri = `/api/file-is-available/${this.state.claimName}/${this.state.claimId}`;
        const xhr = new XMLHttpRequest();
        console.log(`checking local availability for ${this.state.claimName}#${this.state.claimId}`)
        xhr.open("GET", uri, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                const response = JSON.parse(xhr.response);
                if (xhr.status == 200) {
                    if (response.message === true) {
                        console.log('local asset is available on spee.ch')
                        that.showAsset();
                    } else {
                        that.showSearchMessage();
                        that.getAsset()
                    }
                } else {
                    console.log('get failed:', response);
                    that.showFailureMessage('Well this sucks, but we can\'t seem to phone home');
                }
            }
        };
        xhr.send();
    };
    this.getAsset = function() {
        const that = this;
        const uri = `/api/claim-get/${this.state.claimName}/${this.state.claimId}`;
        const xhr = new XMLHttpRequest();
        console.log(`getting ${this.state.claimName}#${this.state.claimId}`)
        xhr.open("GET", uri, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                const response = JSON.parse(xhr.response);
                if (xhr.status == 200) {
                    console.log('get returned successfully', response);
                    that.showAsset();
                } else {
                    console.log('get failed:', response);
                    that.showFailureMessage(`${response.message}`);
                }
            }
        };
        xhr.send();
    };
};