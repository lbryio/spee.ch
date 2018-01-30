import React from 'react';
import { Link } from 'react-router-dom';
import AssetDisplay from 'components/AssetDisplay';
import request from 'utils/request';

class ShowLitePage extends React.Component {
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
    const that = this;
    const claimName = that.props.claimName;
    const claimId = that.props.claimId || 'none';
    this.getLongClaimId(claimName, claimId)
      .then(claimLongId => {
        return that.getClaimData(claimName, claimLongId);
      })
      .then(claimData => {
        this.setState({ claimData });
      })
      .catch(error => {
        this.setState({error});
      });
  }
  getLongClaimId (claimName, claimId) {
    return new Promise((resolve, reject) => {
      const url = `/api/claim-get-long-id/${claimName}/${claimId}`;
      return request(url)
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
    return (
      <div className="row row--tall flex-container--column flex-container--center-center">
        {this.state.error &&
          <p>{this.state.error}</p>
        }
        {this.state.claimData &&
        <div>
          <AssetDisplay
              claimName={this.state.claimData.name}
              claimId={this.state.claimData.claimId}
            />
          <Link id="asset-boilerpate" className="link--primary fine-print" to={`/${this.state.claimData.claimId}/${this.state.claimData.name}`}>hosted via Spee.ch</Link>
        </div>
        }
      </div>
    );
  }
};

export default ShowLitePage;
