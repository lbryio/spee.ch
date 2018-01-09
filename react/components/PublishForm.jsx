import React from 'react';
import PreviewDropzone from './PreviewDropzone.jsx';
import PublishTitleInput from './PublishTitleInput.jsx';
import ChannelSelector from './ChannelSelector.jsx';
import PublishUrlInput from './PublishUrlInput.jsx';
import PublishThumbnailInput from './PublishThumbnailInput.jsx';
import PublishMetadataInputs from './PublishMetadataInputs.jsx';
import AnonymousOrChannelSelect from './AnonymousOrChannelSelect.jsx';

import { selectFile, clearFile } from '../actions';
import { connect } from 'react-redux';

class PublishForm extends React.Component {
  constructor (props) {
    super(props);
    // set defaults
    this.state = {
      error             : null,
      showMetadataInputs: false,
    };
    this.publish = this.publish.bind(this);
  }
  publish () {
    // publish the asset
  }
  render () {
    return (
      <div className="row row--no-bottom">
        <div className="column column--10">

          <PublishTitleInput
            title={this.props.title}
            updateUploaderState={this.props.updateUploaderState}
          />

        </div>
        <div className="column column--5 column--sml-10" >
          <div className="row row--padded">

            <PreviewDropzone
              file={this.props.file}
            />
            { (this.props.file.type === 'video/mp4') &&
              <PublishThumbnailInput
                thumbnail={this.props.thumbnail}
              />
            }
          </div>
        </div>
        <div className="column column--5 column--sml-10 align-content-top">
          <div id="publish-active-area" className="row row--padded">

            <PublishUrlInput
              fileName={this.props.file.name}
              claim={this.props.claim}
              publishToChannel={this.props.publishToChannel}
              loggedInChannelName={this.props.loggedInChannelName}
              loggedInChannelShortId={this.props.loggedInChannelShortId}
              cleanseInput={this.props.cleanseInput}
              updateUploaderState={this.props.updateUploaderState}
              makeGetRequest={this.props.makeGetRequest}
            />
            <AnonymousOrChannelSelect
              publishToChannel={this.props.publishToChannel}
              updateUploaderState={this.props.updateUploaderState}
            />
            <ChannelSelector
              loggedInChannelName={this.props.loggedInChannelName}
              publishToChannel={this.props.publishToChannel}
              cleanseInput={this.props.cleanseInput}
              updateUploaderState={this.props.updateUploaderState}
              makeGetRequest={this.props.makeGetRequest}
              makePostRequest={this.props.makePostRequest}
            />

            <PublishMetadataInputs
              updateUploaderState={this.props.updateUploaderState}
            />

            <div className="row row--padded row--wide">
              <div className="input-error" id="input-error-publish-submit" hidden="true">{this.state.error}</div>
              <button id="publish-submit" className="button--primary button--large" onClick={this.publish}>Publish</button>
            </div>

            <div className="row row--short align-content-center">
              <button className="button--cancel" onClick={this.props.onFileClear}>Cancel</button>
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

const mapStateToProps = state => {
  return {
    loggedInChannelName   : state.loggedInChannelName,
    loggedInChannelShortId: state.loggedInChannelShortId,
    publishToChannel      : state.publishToChannel,
    file                  : state.file,
    title                 : state.title,
    claim                 : state.claim,
    thumbnail             : state.thumbnail,
    description           : state.description,
    license               : state.license,
    nsfw                  : state.nsfw,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFileSelect: (file) => {
      dispatch(selectFile(file));
    },
    onFileClear: () => {
      dispatch(clearFile());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishForm);
