import React from 'react';
import ErrorPage from 'components/ErrorPage';
import ShowAssetLite from 'components/ShowAssetLite';
import ShowAssetDetails from 'components/ShowAssetDetails';

class ShowAsset extends React.Component {
  componentDidMount () {
    const { asset, requestId, requestName, requestModifier } = this.props;
    if (!asset) {
      return this.props.onNewAssetRequest(requestId, requestName, requestModifier);
    };
  }
  render () {
    const {asset, requestExtension} = this.props;
    if (asset) {
      return requestExtension ? <ShowAssetLite/> : <ShowAssetDetails/>;
    };
    return (
      <ErrorPage error={'loading asset data...'}/>
    );
  }
};

export default ShowAsset;
