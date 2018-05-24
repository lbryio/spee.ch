import React from 'react';
import { withRouter } from 'react-router-dom';
import Dropzone from '@containers/Dropzone';
import PublishTitleInput from '@containers/PublishTitleInput';
import PublishUrlInput from '@containers/PublishUrlInput';
import PublishThumbnailInput from '@containers/PublishThumbnailInput';
import PublishMetadataInputs from '@containers/PublishMetadataInputs';
import ChannelSelect from '@containers/ChannelSelect';

class PublishDetails extends React.Component {
  constructor (props) {
    super(props)
    this.onPublishSubmit = this.onPublishSubmit.bind(this);
  }
  onPublishSubmit () {
    this.props.startPublish(this.props.history);
  }
  render () {
    return (
      <div className='row row--no-bottom'>
        <div className='column column--10'>
          <PublishTitleInput />
        </div>
        {/* left column */}
        <div className='column column--5 column--sml-10' >
          <div className='row row--padded'>
            <Dropzone />
          </div>
        </div>
        {/* right column */}
        <div className='column column--5 column--sml-10 align-content-top'>
          <div id='publish-active-area' className='row row--padded'>
            <div className='row row--padded row--no-top row--wide'>
              <PublishUrlInput />
            </div>
            <div className='row row--padded row--no-top row--wide'>
              <ChannelSelect />
            </div>
            { (this.props.file.type === 'video/mp4') && (
              <div className='row row--padded row--no-top row--wide '>
                <PublishThumbnailInput />
              </div>
            )}
            <div className='row row--padded row--no-top row--no-bottom row--wide'>
              <PublishMetadataInputs />
            </div>
            <div className='row row--wide align-content-center'>
              <button id='publish-submit' className='button--primary button--large' onClick={this.onPublishSubmit}>Publish</button>
            </div>
            <div className='row row--padded row--no-bottom align-content-center'>
              <button className='button--cancel' onClick={this.props.clearFile}>Cancel</button>
            </div>
            <div className='row row--short align-content-center'>
              <p className='fine-print'>By clicking 'Publish', you affirm that you have the rights to publish this content to the LBRY network, and that you understand the properties of publishing it to a decentralized, user-controlled network. <a className='link--primary' target='_blank' href='https://lbry.io/learn'>Read more.</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(PublishDetails);
