import React from 'react';
import ShowAssetLite from 'components/ShowAssetLite';
import ShowAssetDetails from 'components/ShowAssetDetails';
import request from 'utils/request';

class ShowAsset extends React.Component {
  constructor (props) {
    super(props);
    this.getLongClaimId = this.getLongClaimId.bind(this);
    this.getClaimData = this.getClaimData.bind(this);
  }
  componentDidMount () {
    const { name, modifier } = this.props;
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
    this.getLongClaimId(params)
      .then(claimLongId => {
        return Promise.all([this.getShortClaimId(claimLongId, name), this.getClaimData(claimLongId, name)]);
      })
      .then(([shortId, claimData]) => {
        this.props.onAssetClaimDataUpdate(claimData, shortId);
      })
      .catch(error => {
        this.props.onShowAssetError(error);
      });
  }
  getLongClaimId (params) {
    const url = `/api/claim/long-id`;
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
    const url = `/api/claim/short-id/${longId}/${name}`;
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
      const url = `/api/claim/data/${claimName}/${claimId}`;
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
    const { error, claimData, extension } = this.props;
    if (error) {
      return (
        <p>{error}</p>
      );
    }
    if (claimData) {
      if (extension) {
        return (
          <ShowAssetLite />
        );
      } else {
        return (
          <ShowAssetDetails />
        );
      }
    };
    return (
      <div> </div>
    );
  }
};

export default ShowAsset;
