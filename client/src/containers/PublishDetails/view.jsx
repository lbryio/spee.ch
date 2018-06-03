import React from 'react';
import { withRouter } from 'react-router-dom';
import PublishUrlInput from '@containers/PublishUrlInput';
import PublishThumbnailInput from '@containers/PublishThumbnailInput';
import PublishMetadataInputs from '@containers/PublishMetadataInputs';
import ChannelSelect from '@containers/ChannelSelect';
import Row from '@components/Row';

class PublishDetails extends React.Component {
  constructor (props) {
    super(props);
    this.onPublishSubmit = this.onPublishSubmit.bind(this);
  }
  onPublishSubmit () {
    this.props.startPublish(this.props.history);
  }
  render () {
    return (
      <div>
        <Row>
          <PublishUrlInput />
        </Row>

        <Row>
          <ChannelSelect />
        </Row>

        { this.props.file.type === 'video/mp4' && (
          <Row>
            <PublishThumbnailInput />
          </Row>
        )}

        <Row>
          <PublishMetadataInputs />
        </Row>

        <Row>
          <button
            id='publish-submit'
            className='button--primary button--large'
            onClick={this.onPublishSubmit}
          >
            Publish
          </button>
        </Row>

        <Row>
          <button className='button--cancel' onClick={this.props.clearFile}>Cancel</button>
        </Row>

        <Row>
          <p className='fine-print'>By clicking 'Publish', you affirm that you have the rights to publish this content to the LBRY network, and that you understand the properties of publishing it to a decentralized, user-controlled network. <a className='link--primary' target='_blank' href='https://lbry.io/learn'>Read more.</a></p>
        </Row>

      </div>
    );
  }
};

export default withRouter(PublishDetails);
