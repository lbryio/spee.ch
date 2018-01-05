import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from './components/dropzone.jsx';
import PublishForm from './components/publishForm.jsx';
import PublishStatus from './components/publishStatus.jsx';

const DROPZONE = 'DROPZONE';
const DETAILS = 'DETAILS';
const STATUS = 'STATUS';
const initialState = {
  showComponent         : DROPZONE,  // DROPZONE, DETAILS, or PUBLISHING
  loggedInChannelName   : null,
  loggedInChannelShortId: null,
  publishToChannel      : false,
  file                  : null,
  title                 : '',
  channel               : null,
  claim                 : '',
  thumbnail             : '',
  description           : '',
  license               : '',
  nsfw                  : '',
};

class Uploader extends React.Component {
  constructor (props) {
    super(props);
    this.state = initialState;
    // bind class methods with `this`
    this.updateUploaderState = this.updateUploaderState.bind(this);
    this.clearUploaderState = this.clearUploaderState.bind(this);
    this.showComponent = this.showComponent.bind(this);
    this.stageFileAndShowDetails = this.stageFileAndShowDetails.bind(this);
    this.makeGetRequest = this.makeGetRequest.bind(this);
    this.makePostRequest = this.makePostRequest.bind(this);
  }
  componentDidMount () {
    // check for whether a channel is logged in
    // if so, setState loggedInChannel to the channel name
    // const loggedInChannel = getCookie('channel_name');
    // this.setState({loggedInChannel})
    // const loggedInChannelShortId = getCookie('short_channel_id');
    // this.setState({loggedInChannelShortId})
  }
  updateUploaderState (name, value) {
    console.log(`updateUploaderState ${name} ${value}`);
    this.setState({[name]: value});
  }
  clearUploaderState () {
    this.setState(initialState);
  }
  showComponent (component) {
    this.setState({showComponent: component});
  }
  stageFileAndShowDetails (selectedFile) {
    console.log('stageFileAndShowDetails', selectedFile);
    // store the selected file for upload
    this.setState({'file': selectedFile});
    // hide the dropzone and show the details
    this.showComponent(DETAILS);
  }
  makeGetRequest (url) {
    return new Promise((resolve, reject) => {
      let xhttp = new XMLHttpRequest();
      xhttp.open('GET', url, true);
      xhttp.responseType = 'json';
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 ) {
          if ( xhttp.status == 200) {
            resolve(xhttp.response);
          } else if (xhttp.status == 403) {
            reject('Wrong channel name or password');
          } else {
            reject('request failed with status:' + xhttp.status);
          };
        }
      };
      xhttp.send();
    });
  }
  makePostRequest (url, params) {
    return new Promise((resolve, reject) => {
      let xhttp = new XMLHttpRequest();
      xhttp.open('POST', url, true);
      xhttp.responseType = 'json';
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 ) {
          if ( xhttp.status == 200) {
            resolve(xhttp.response);
          } else if (xhttp.status == 403) {
            reject('Wrong channel name or password');
          } else {
            reject('request failed with status:' + xhttp.status);
          };
        }
      };
      xhttp.send(params);
    });
  }
  render () {
    return (
      <div className="row row--tall flex-container--column">
        { this.state.showComponent === DROPZONE &&
          <Dropzone stageFileAndShowDetails={this.stageFileAndShowDetails}/>
        }
        { this.state.showComponent === DETAILS &&
          <PublishForm
            updateUploaderState={this.updateUploaderState}
            clearUploaderState={this.clearUploaderState}
            makeGetRequest={this.makeGetRequest}
            loggedInChannelName={this.state.loggedInChannelName}
            loggedInChannelShortId={this.state.loggedInChannelShortId}
            publishToChannel={this.state.publishToChannel}
            file={this.state.file}
            title={this.state.title}
            channel={this.state.channel}
            claim={this.state.claim}
            thumbnail={this.state.thumbnail}
            description={this.state.description}
            license={this.state.license}
            nsfw={this.state.nsfw}
          />
        }
        { this.state.showComponent === STATUS &&
          <PublishStatus />
        }
      </div>
    );
  }
};

ReactDOM.render(
  <Uploader />,
  document.getElementById('react-uploader')
);
