import React from 'react';
import ShowAssetLite from 'components/ShowAssetLite';
import ShowAssetDetails from 'components/ShowAssetDetails';
import request from 'utils/request';

class ShowAsset extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      claimData: null,
      error    : null,
    };
    this.getLongClaimId = this.getLongClaimId.bind(this);
    this.getClaimData = this.getClaimData.bind(this);
  }
  componentDidMount () {
    console.log('ShowAsset did mount');
    console.log('ShowAsset props', this.props);
    let body = {};
    if (this.props.identifier) {
      if (this.props.identifier.isChannel) {
        body['channelName'] = this.props.identifier.channelName;
        body['channelClaimId'] = this.props.identifier.channelClaimId;
      } else {
        body['claimId'] = this.props.identifier.claimId;
      }
    }
    if (this.props.claim) {
      body['claimName'] = this.props.claim.claimName;
    }
    const params = {
      method : 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
    }
    const that = this;
    this.getLongClaimId(params)
      .then(claimLongId => {
        return that.getClaimData(this.props.claim.claimName, claimLongId);
      })
      .then(claimData => {
        this.setState({ claimData });
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
    if (this.props.isServeRequest) {
      return (
        <ShowAssetLite
          error={this.state.error}
          claimData={this.state.claimData}
        />
      );
    }
    return (
      <ShowAssetDetails
        error={this.state.error}
        claimData={this.state.claimData}
      />
    );
  }
};

// required props
// identifier
// claim
// isServeRequest

export default ShowAsset;
