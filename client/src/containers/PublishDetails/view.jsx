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

class PublishDetails extends React.Component {
  constructor (props) {
    super(props);
    this.onPublishSubmit = this.onPublishSubmit.bind(this);
    this.abandonClaim = this.abandonClaim.bind(this);
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
  render () {
    const {file, isUpdate, asset} = this.props;
    return (
      <div>
        {isUpdate ? (asset && (
          <React.Fragment>
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
            <Row>
              <RowLabeled
                label={
                  <Label value={'Asset:'} />
                }
                content={
                  <span className='text'>
                    {asset.name}
                  </span>
                }
              />
            </Row>
          </React.Fragment>
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
