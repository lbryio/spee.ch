import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from './components/dropzone.jsx';
import PublishForm from './components/publishForm.jsx';
import PublishStatus from './components/publishStatus.jsx';

const DROPZONE = 'DROPZONE';
const DETAILS = 'DETAILS';
const STATUS = 'STATUS';
const initialState = {
  showComponent   : DROPZONE,  // DROPZONE, DETAILS, or PUBLISHING
  loggedInChannel : null,
  publishToChannel: false,
  file            : null,
  title           : '',
  channel         : null,
  url             : '',
  thumbnail       : '',
  description     : '',
  license         : '',
  nsfw            : '',
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
  }
  componentDidMount () {
    // check for whether a channel is logged in
    // if so, setState loggedInChannel to the channel name
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
            loggedInChannel={this.state.loggedInChannel}
            publishToChannel={this.state.publishToChannel}
            file={this.state.file}
            title={this.state.title}
            channel={this.state.channel}
            url={this.state.url}
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
