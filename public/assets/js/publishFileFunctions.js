var stagedFiles = null;

const publishFileFunctions = {
    returnNullOrChannel: function () {
        const channelRadio = document.getElementById('channel-radio');
        if (channelRadio.checked) {
            const channelInput = document.getElementById('channel-name-select');
            return channelInput.value.trim();
        }
        return null;
    },
    // Validate the publish submission and then trigger upload
    showUploadStartedMessage: function (){
        console.log('starting upload');
        // hide the publish tool
        this.hidePublishTools();
        // show the progress status and animation
        this.showPublishStatus();
        this.showPublishProgressBar();
    },
    showUploadProgressMessage: function (percentage){
        this.updatePublishStatus('<p>File is loading to server</p>');
        this.updateUploadPercent('<p class="blue">' + percentage + '% </p>');
    },
    showFilePublishUpdate: function (msg) {
        this.updatePublishStatus('<p>' + msg + '</p>');
        this.updateUploadPercent('<p>Curious what magic is happening here? <a class="link--primary" target="blank" href="https://lbry.io/faq/what-is-lbry">Learn more.</a></p>');
    },
    showFilePublishFailure: function (msg){
        this.updatePublishStatus('<p>Something went wrong...</p><p><strong>' + msg + '</strong></p><p>For help, post the above error text in the #speech channel on the <a class="link--primary" href="https://discord.gg/YjYbwhS" target="_blank">lbry discord</a>');
        this.hidePublishProgressBar();
        this.hideUploadPercent();
    },
    showFilePublishComplete: function (msg) {
        console.log('Publish complete!');
        const showUrl = msg.lbryTx.claim_id + "/" + msg.name;
        // update status
        this.updatePublishStatus('<p>Your publish is complete! You are being redirected to it now.</p>');
        this.updateUploadPercent('<p><a class="link--primary" target="_blank" href="' + showUrl + '">If you do not get redirected, click here.</a></p>')
        // redirect the user
        window.location.href = showUrl;
    },
}


