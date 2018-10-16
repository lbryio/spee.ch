import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PublishUrlInput from '@containers/PublishUrlInput';
import PublishThumbnailInput from '@containers/PublishThumbnailInput';
import PublishMetadataInputs from '@containers/PublishMetadataInputs';
import ChannelSelect from '@containers/ChannelSelect';
import Row from '@components/Row';
import Label from '@components/Label';
import RowLabeled from '@components/RowLabeled';
import ButtonPrimaryJumbo from '@components/ButtonPrimaryJumbo';
import ButtonTertiary from '@components/ButtonTertiary';
import ButtonSecondary from '@components/ButtonSecondary';
import SpaceAround from '@components/SpaceAround';
import PublishFinePrint from '@components/PublishFinePrint';
import { SAVE } from '../../constants/confirmation_messages';

class PublishDetails extends React.Component {
  constructor (props) {
    super(props);
    this.onPublishSubmit = this.onPublishSubmit.bind(this);
    this.abandonClaim = this.abandonClaim.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  onPublishSubmit () {
    this.props.startPublish(this.props.history);
  }
  abandonClaim () {
    const {asset, history} = this.props;
    if (asset) {
      const {claimData} = asset;
      this.props.abandonClaim({claimData, history});
    }
  }
  onCancel () {
    const { isUpdate, clearFile, history } = this.props;
    if (isUpdate) {
      history.push('/');
    } else {
      if (confirm(SAVE)) {
        clearFile();
      }
    }
  }
  render () {
    const {file, isUpdate, asset} = this.props;
    return (
      <div>
        {isUpdate ? (asset && (
          <Row>
            <RowLabeled
              label={
                <Label value={'Channel:'} />
              }
              content={
                <span className='text'>
                  {asset.claimData.channelName}
                </span>
              }
            />
          </Row>
        )) : (
          <React.Fragment>
            <Row>
              <PublishUrlInput />
            </Row>

            <Row>
              <ChannelSelect />
            </Row>
          </React.Fragment>
        )}

        { file && file.type === 'video/mp4' && (
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

        {isUpdate && (
          <Row>
            <SpaceAround>
              <ButtonSecondary
                value={'Abandon Claim'}
                onClickHandler={this.abandonClaim}
              />
            </SpaceAround>
          </Row>
        )}

        <Row>
          <SpaceAround>
            <ButtonTertiary
              value={'Cancel'}
              onClickHandler={this.onCancel}
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
