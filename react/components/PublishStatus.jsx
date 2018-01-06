import React from 'react';

class PublishStatus extends React.Component {
  render () {
    return (
      <div id="publish-status" class="hidden">
        <div class="row row--margined">
          <div id="publish-update" class="row align-content-center"></div>
          <div id="publish-progress-bar" class="row align-content-center"></div>
          <div id="upload-percent" class="row align-content-center"></div>
          <div>{this.props.status}</div>
        </div>
      </div>
    );
  }
};

module.exports = PublishStatus;
