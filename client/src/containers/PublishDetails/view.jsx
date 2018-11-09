import React from 'react';
import { withRouter } from 'react-router-dom';
import PublishUrlInput from '@containers/PublishUrlInput';
import PublishThumbnailInput from '@containers/PublishThumbnailInput';
import PublishMetadataInputs from '@containers/PublishMetadataInputs';
import ChannelSelect from '@containers/ChannelSelect';
import Row from '@components/Row';
import ButtonPrimaryJumbo from '@components/ButtonPrimaryJumbo';
import ButtonSecondary from '@components/ButtonSecondary';
import SpaceAround from '@components/SpaceAround';
import PublishFinePrint from '@components/PublishFinePrint';

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
            <ButtonSecondary
              value={'Cancel'}
              onClickHandler={this.props.clearFile}
            />
          </SpaceAround>
        </Row>

        <Row>
          <PublishFinePrint />
        </Row>
      </div>
    );
  }
};

export default withRouter(PublishDetails);
