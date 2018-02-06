import React from 'react';

const ThumbnailPreview = ({dataUrl}) => {
  const thumbnailPreviewStyle = {
    width  : '30%',
    padding: '1%',
    display: 'inline-block',
  }
  return (
    <div style={thumbnailPreviewStyle}>
      { dataUrl ? (
        <img style={{width: '100%'}} src={dataUrl} alt='image preview here' />
      ) : (
        <p>loading...</p>
        )
      }
    </div>
  );
}

class PublishThumbnailInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  componentDidMount () {
    this.setClaimAndThumbnail(this.props.publishClaim);
    this.createThreePotentialThumbnails();
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.publishFile !== this.publishFile) {
      // this.createThreePotentialThumbnails();
    }
    if (nextProps.publishClaim !== this.props.publishClaim) {
      console.log(nextProps.publishClaim, this.props.publishClaim);
      this.setClaimAndThumbnail(nextProps.publishClaim);
    }
  }
  createThreePotentialThumbnails () {
    const videoFile = this.props.publishFile;
    console.log('video file', videoFile);
    Promise.all([this.createThumbnail(videoFile), this.createThumbnail(videoFile), this.createThumbnail(videoFile)])
      .then(([thumbOne, thumbTwo, thumbThree]) => {
        // set the potential thumbnails
        console.log([thumbOne, thumbTwo, thumbThree]);
        this.selectVideoThumb(thumbOne);
        this.setPossibleThumbnailFiles(thumbOne, thumbTwo, thumbThree);
      })
      .catch(error => {
        this.setState({error: error.message});
      });
  }
  createThumbnail (file) {
    return new Promise((resolve, reject) => {
      console.log('creating a thumbnail');
      var fileReader = new FileReader();
      fileReader.onload = () => {
        console.log('thumbnail loaded');
        const blob = new Blob([fileReader.result], {type: file.type});
        const url = URL.createObjectURL(blob);
        let video = document.createElement('video');
        const timeupdate = () => {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
            video.pause();
          }
        };
        const snapImage = () => {
          let canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageDataUrl = canvas.toDataURL();
          // console.log('imageDataUrl', imageDataUrl);
          const success = imageDataUrl.length > 1000;
          if (success) { // do something with the image
            return resolve(imageDataUrl);
            // URL.revokeObjectURL(url);
          }
          reject(success);
        };
        video.addEventListener('loadeddata', () => {
          if (snapImage()) {
            video.removeEventListener('timeupdate', timeupdate);
          }
        });
        video.addEventListener('timeupdate', timeupdate);
        video.preload = 'metadata';
        video.src = url;
        // Load video in Safari / IE11
        video.muted = true;
        video.playsInline = true;
        video.play();
      };
      fileReader.readAsArrayBuffer(file);
    });
  }
  selectVideoThumb (dataUrl) {
    // update this.props.selectedFile
    this.props.onThumbnailFileSelect(dataUrl);
  }
  setPossibleThumbnailFiles (fileOne, fileTwo, fileThree) {
    console.log('updating thumbnail file options');
    this.props.onThumbnailFileOptionsChange(fileOne, fileTwo, fileThree);
  }
  setClaimAndThumbnail (claim) {
    // set thumbnail claim based on publish claim name
    const url = `${this.props.host}/${this.props.channel}/${claim}.jpeg`;
    this.props.onThumbnailClaimChange(claim, url);
  }
  render () {
    return (
      <div>
        <label className="label">Thumbnail:</label>
        <div>
            <p className="info-message-placeholder info-message--failure">{this.state.error}</p>
            {this.props.potentialFiles.map((file, index) => <ThumbnailPreview dataUrl={file} key={index}/>)}
        </div>
      </div>
    );
  }
}

export default PublishThumbnailInput;
