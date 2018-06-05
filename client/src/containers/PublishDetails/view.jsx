import React from 'react';
import { withRouter } from 'react-router-dom';
import PublishUrlInput from '@containers/PublishUrlInput';
import PublishThumbnailInput from '@containers/PublishThumbnailInput';
import PublishMetadataInputs from '@containers/PublishMetadataInputs';
import ChannelSelect from '@containers/ChannelSelect';
import Row from '@components/Row';
import ButtonPrimaryJumbo from '@components/ButtonPrimaryJumbo';
import ButtonTertiary from '@components/ButtonTertiary';
import SpaceAround from '@components/SpaceAround';

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
          <ButtonPrimaryJumbo
            value={'Publish'}
            onClickHandler={this.onPublishSubmit}
          />
        </Row>

        <Row>
          <SpaceAround>
            <ButtonTertiary
              value={'Cancel'}
              onClickHandler={this.props.clearFile}
            />
          </SpaceAround>
        </Row>

        <Row>
          <p className='fine-print'>By clicking 'Publish', you affirm that you have the rights to publish this content to the LBRY network, and that you understand the properties of publishing it to a decentralized, user-controlled network. <a className='link--primary' target='_blank' href='https://lbry.io/learn'>Read more.</a></p>
        </Row>
      </div>
    );
  }
};

export default withRouter(PublishDetails);
