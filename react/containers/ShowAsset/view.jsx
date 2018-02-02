import React from 'react';
import ShowAssetLite from 'components/ShowAssetLite';
import ShowAssetDetails from 'components/ShowAssetDetails';
import request from 'utils/request';

class ShowAsset extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      error: null,
    };
    this.getLongClaimId = this.getLongClaimId.bind(this);
    this.getClaimData = this.getClaimData.bind(this);
  }
  componentDidMount () {
    console.log('ShowAsset did mount');
    console.log('ShowAsset props', this.props);
    const modifier = this.props.modifier;
    const name = this.props.claim;
    // create request params
    let body = {};
    if (modifier) {
      if (modifier.channel) {
        body['channelName'] = modifier.channel.name;
        body['channelClaimId'] = modifier.channel.id;
      } else {
        body['claimId'] = modifier.id;
      }
    }
    body['claimName'] = name;
    const params = {
      method : 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    }
    // make request
    const that = this;
    this.getLongClaimId(params)
      .then(claimLongId => {
        return that.getClaimData(name, claimLongId);
      })
      .then(claimData => {
        this.props.onAssetDataUpdate(claimData);
      })
      .catch(error => {
        this.setState({error});
      });
  }
  getLongClaimId (params) {
    const url = `/api/claim-get-long-id`;
    console.log('params:', params);
    return new Promise((resolve, reject) => {
      request(url, params)
        .then(({ success, message }) => {
          console.log('get long claim id response:', message);
          if (!success) {
            reject(message);
          }
          resolve(message);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }
  getClaimData (claimName, claimId) {
    return new Promise((resolve, reject) => {
      const url = `/api/claim-get-data/${claimName}/${claimId}`;
      return request(url)
        .then(({ success, message }) => {
          console.log('get claim data response:', message);
          if (!success) {
            reject(message);
          }
          resolve(message);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }
  render () {
    if (this.props.extension) {
      return (
        <ShowAssetLite
          error={this.state.error}
          claimData={this.props.claimData}
        />
      );
    }
    return (
      <ShowAssetDetails
        error={this.state.error}
        claimData={this.props.claimData}
      />
    );
  }
};

export default ShowAsset;
