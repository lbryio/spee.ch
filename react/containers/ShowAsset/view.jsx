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
      if (modifier.id) {
        body['claimId'] = modifier.id;
      } else {
        body['channelName'] = modifier.channel.name;
        body['channelClaimId'] = modifier.channel.id;
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
        return Promise.all([that.getShortClaimId(claimLongId, name), that.getClaimData(claimLongId, name)]);
      })
      .then(([shortId, claimData]) => {
        this.setState({error: null}); // note: move this to redux level
        this.props.onAssetClaimDataUpdate(claimData, shortId);
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
        .then(({ success, message, data }) => {
          console.log('get long claim id response:', message);
          if (!success) {
            reject(message);
          }
          resolve(data);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }
  getShortClaimId (longId, name) {
    const url = `/api/claim-shorten-id/${longId}/${name}`;
    return new Promise((resolve, reject) => {
      request(url)
        .then(({ success, message, data }) => {
          console.log('get short claim id response:', data);
          if (!success) {
            reject(message);
          }
          resolve(data);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }
  getClaimData (claimId, claimName) {
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
  componentWillUnmount () {
    this.props.onAssetClaimDataClear();
  }
  render () {
    if (this.props.claimData) {
      return (
        <div>
          { this.props.extension ? (
            <ShowAssetLite
              error={this.state.error}
              claimData={this.props.claimData}
            />
          ) : (
            <ShowAssetDetails
              error={this.state.error}
              claimData={this.props.claimData}
              shortId={this.props.shortId}
            />
          )}
        </div>
      );
    }
    return (
      <div></div>
    );
  }
};

export default ShowAsset;
