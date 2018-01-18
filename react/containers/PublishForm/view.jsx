import React from 'react';
import {getCookie} from 'utils/cookies';
import Dropzone from 'containers/Dropzone';
import PublishTitleInput from 'containers/PublishTitleInput';
import PublishUrlInput from 'containers/PublishUrlInput';
import PublishThumbnailInput from 'containers/PublishThumbnailInput';
import PublishMetadataInputs from 'containers/PublishMetadataInputs';
import ChannelSelect from 'containers/ChannelSelect';
import * as publishStates from 'constants/publishing_states';

class PublishForm extends React.Component {
  constructor (props) {
    super(props);
    this.validatePublishRequest = this.validatePublishRequest.bind(this);
    this.makePublishRequest = this.makePublishRequest.bind(this);
    this.publish = this.publish.bind(this);
  }
  componentDidMount () {
    // check for whether a channel is already logged in
    const loggedInChannelName = getCookie('channel_name');
    const loggedInChannelShortId = getCookie('short_channel_id');
    const loggedInChannelLongId = getCookie('long_channel_id');
    console.log(`channel cookies found: ${loggedInChannelName} ${loggedInChannelShortId} ${loggedInChannelLongId}`);
    this.props.onChannelLogin(loggedInChannelName, loggedInChannelShortId, loggedInChannelLongId);
  }
  validatePublishRequest () {
    // make sure all required data is provided
    return new Promise((resolve, reject) => {
      // is there a file?
      if (!this.props.file) {
        return reject(new Error('Please choose a file'));
      }
      // is there a claim chosen?
      if (!this.props.claim) {
        return reject(new Error('Please enter a URL'));
      }
      if (this.props.urlError) {
        return reject(new Error('Fix the url'));
      }
      // if publishInChannel is true, is a channel logged in (or selected)
      if (this.props.publishInChannel && !this.props.loggedInChannel.name) {
        return reject(new Error('Select "Anonymous" or log in to a channel'));
      }
      // is the claim available?
      resolve();
    });
  }
  makePublishRequest (file, metadata) {
    const uri = '/api/claim-publish';
    const xhr = new XMLHttpRequest();
    const fd = this.appendDataToFormData(file, metadata);
    const that = this;
    xhr.upload.addEventListener('loadstart', function () {
      that.props.onPublishStatusChange(publishStates.LOAD_START, 'upload started');
    });
    xhr.upload.addEventListener('progress', function (e) {
      if (e.lengthComputable) {
        const percentage = Math.round((e.loaded * 100) / e.total);
        console.log('progress:', percentage);
        that.props.onPublishStatusChange(publishStates.LOADING, `${percentage}%`);
      }
    }, false);
    xhr.upload.addEventListener('load', function () {
      console.log('loaded 100%');
      that.props.onPublishStatusChange(publishStates.PUBLISHING, null);
    }, false);
    xhr.open('POST', uri, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log('publish response:', xhr.response);
        if (xhr.status === 200) {
          console.log('publish complete!');
          const url = JSON.parse(xhr.response).message.url;
          that.props.onPublishStatusChange(publishStates.SUCCESS, url);
          window.location = url;
        } else if (xhr.status === 502) {
          that.props.onPublishStatusChange(publishStates.FAILED, 'Spee.ch was not able to get a response from the LBRY network.');
        } else {
          that.props.onPublishStatusChange(publishStates.FAILED, JSON.parse(xhr.response).message);
        }
      }
    };
    // Initiate a multipart/form-data upload
    xhr.send(fd);
  }
  createMetadata () {
    let metadata = {
      name       : this.props.claim,
      title      : this.props.title,
      description: this.props.description,
      license    : this.props.license,
      nsfw       : this.props.nsfw,
      type       : this.props.file.type,
      thumbnail  : this.props.thumbnail,
    };
    if (this.props.publishInChannel) {
      metadata['channelName'] = this.props.loggedInChannel.name;
    }
    return metadata;
  }
  appendDataToFormData (file, metadata) {
    var fd = new FormData();
    fd.append('file', file);
    for (var key in metadata) {
      if (metadata.hasOwnProperty(key)) {
        console.log(key, metadata[key]);
        fd.append(key, metadata[key]);
      }
    }
    return fd;
  }
  publish () {
    // publish the asset
    const that = this;
    this.validatePublishRequest()
      .then(() => {
        const metadata = that.createMetadata();
        // publish the claim
        return that.makePublishRequest(that.props.file, metadata);
      })
      .then(() => {
        that.props.onPublishStatusChange('publish request made');
      })
      .catch((error) => {
        that.props.onPublishSubmitError(error.message);
      });
  }
  render () {
    return (
      <div className="row row--no-bottom">
        <div className="column column--10">
          <PublishTitleInput />
        </div>
        <div className="column column--5 column--sml-10" >
          <div className="row row--padded">
            <Dropzone />
          </div>
        </div>
        <div className="column column--5 column--sml-10 align-content-top">
          <div id="publish-active-area" className="row row--padded">
            <div className="row row--padded row--no-top row--wide">
              <PublishUrlInput />
            </div>
            <div className="row row--padded row--no-top row--wide">
              <ChannelSelect />
            </div>
            { (this.props.file.type === 'video/mp4') && (
              <div className="row row--padded row--no-top row--wide ">
                <PublishThumbnailInput />
              </div>
            )}
            <div className="row row--padded row--no-top row--no-bottom row--wide">
              <PublishMetadataInputs />
            </div>
            { this.props.publishSubmitError && (
              <div className="row align-content-center">
                <p className="info-message-placeholder info-message--failure">{this.props.publishSubmitError}</p>
              </div>
            )}
            <div className="row row--wide align-content-center">
              <button id="publish-submit" className="button--primary button--large" onClick={this.publish}>Publish</button>
            </div>
            <div className="row row--padded row--no-bottom align-content-center">
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

export default PublishForm;
