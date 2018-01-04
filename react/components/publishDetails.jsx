import React from 'react';
import PreviewDropzone from './previewDropzone.jsx';
import TitleInput from './titleInput.jsx';
import ChannelSelector from './channelSelector.jsx';
import UrlInput from './urlInput.jsx';
import ThumbnailInput from './thumbnailInput.jsx';
import MetadataInputs from './metadataInputs.jsx';

class PublishDetails extends React.Component {
  constructor (props) {
    super(props);
    // set defaults
    this.updateUploaderState = this.updateUploaderState.bind(this);
    this.clearUploaderState = this.clearUploaderState.bind(this);
    this.publish = this.publish.bind(this);
  }
  updateUploaderState (name, value) {
    this.props.updateUploaderState(name, value);
  }
  clearUploaderState () {
    this.props.clearUploaderState();
  }
  publish () {
    // publish the asset
  }
  render () {
    return (
      <div className="row row--no-bottom">
        <div className="column column--10">

          <TitleInput title={this.props.title} updateUploaderState={this.updateUploaderState}/>

        </div>
        <div className="column column--5 column--sml-10" >
          <div className="row row--padded">

            <PreviewDropzone
              file={this.props.file}
            />

          </div>
        </div>
        <div className="column column--5 column--sml-10 align-content-top">
          <div id="publish-active-area" className="row row--padded">

            <ChannelSelector />

            <UrlInput file={this.props.file}/>

            { (this.props.file.type === 'video/mp4') && <ThumbnailInput thumbnail={this.props.thumbnail}/> }

            <MetadataInputs />

            <div className="row row--padded row--wide">
              <div className="input-error" id="input-error-publish-submit" hidden="true">{this.props.inputError}</div>
              <button id="publish-submit" className="button--primary button--large" onClick={this.publish}>Upload</button>
            </div>

            <div className="row row--short align-content-center">
              <button className="button--cancel" onClick={this.clearUploaderState}>Cancel</button>
            </div>

            <div className="row row--short align-content-center">
              <p className="fine-print">By clicking 'Upload', you affirm that you have the rights to publish this content to the LBRY network, and that you understand the properties of publishing it to a decentralized, user-controlled network. <a className="link--primary" target="_blank" href="https://lbry.io/learn">Read more.</a></p>
            </div>

          </div>
        </div>
      </div>
    );
  }
};

module.exports = PublishDetails;
