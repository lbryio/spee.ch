import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from './components/dropzone.jsx';
import PublishDetails from './components/publishDetails.jsx';
import PublishStatus from './components/publishStatus.jsx';

const DROPZONE = 'DROPZONE';
const DETAILS = 'DETAILS';
const STATUS = 'STATUS';

class Uploader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showComponent: DROPZONE,  // DROPZONE, DETAILS, or PUBLISHING
      file         : null,
      title        : '',
      channel      : '',
      url          : '',
      thumbnail    : '',
      description  : '',
      license      : '',
      nsfw         : '',
    };
    // bind class methods with `this`
    this.updateUploaderState = this.updateUploaderState.bind(this);
    this.showComponent = this.showComponent.bind(this);
    this.stageFileAndShowDetails = this.stageFileAndShowDetails.bind(this);
  }
  updateUploaderState (name, value) {
    console.log(`updateUploaderState ${name} ${value}`);
    this.setState({[name]: value});
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
      <div>
        { this.state.showComponent === DROPZONE &&
          <Dropzone stageFileAndShowDetails={this.stageFileAndShowDetails}/>
        }
        { this.state.showComponent === DETAILS &&
          <PublishDetails
            updateUploaderState={this.updateUploaderState}
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
