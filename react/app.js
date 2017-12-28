import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from './components/dropzone.jsx';
import PublishDetails from './components/publishDetails.jsx';
import PublishStatus from './components/publishStatus.jsx';

const WAITING = 'WAITING';
const READY = 'READY';
const PUBLISHING = 'PUBLISHING';

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      componentStatus : WAITING,  // WAITING, DETAILS, or PUBLISHING
      publishingStatus: 'starting status',
      files           : [],
    };
    // bind class methods with `this`
    this.handleClick = this.handleClick.bind(this);
    this.updateComponentStatus = this.updateComponentStatus.bind(this);
  }
  handleClick (e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  updateComponentStatus (newStatus) {
    this.setState({componentStatus: newStatus});
  }
  render () {
    return (
      <div>
        <form>
          <input class="input-file" type="file" id="file_input" name="file_input" accept="video/*,image/*" onchange="publishFileFunctions.previewAndStageFile(event.target.files[0])" enctype="multipart/form-data"/>
        </form>
        { this.state.componentStatus === WAITING &&
          <Dropzone/>
        }
        { this.state.componentStatus === READY &&
          <PublishDetails />
        }
        { this.state.componentStatus === PUBLISHING &&
          <PublishStatus status={this.state.publishingStatus} />
        }
      </div>
    );
  }
};

ReactDOM.render(
  <Uploader />,
  document.getElementById('react-uploader')
);
