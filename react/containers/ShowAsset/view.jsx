import React from 'react';
import ErrorPage from 'components/ErrorPage';
import ShowAssetLite from 'components/ShowAssetLite';
import ShowAssetDetails from 'components/ShowAssetDetails';

import { ASSET } from 'constants/show_request_types';

function requestIsAnAssetRequest ({ requestType }) {
  return requestType === ASSET;
}

class ShowAsset extends React.Component {
  componentDidMount () {
    const { asset, requestId, requestName, requestModifier } = this.props;
    if (!asset) {  // case: the asset info does not exist
      return this.props.onNewRequest(requestId, requestName, requestModifier);
    };
  }
  componentWillReceiveProps (nextProps) {
    if (requestIsAnAssetRequest(nextProps)) {
      const { asset, requestId, requestName, requestModifier } = nextProps;
      if (!asset) {  // case: the asset info does not exist
        return this.props.onNewRequest(requestId, requestName, requestModifier);
      };
    }
  }
  render () {
    const {asset, requestExtension} = this.props;
    if (asset) {
      if (requestExtension) {
        return <ShowAssetLite/>;
      }
      return <ShowAssetDetails/>;
    }
    ;
    return (
      <ErrorPage error={'loading asset data...'}/>
    );
  }
};

export default ShowAsset;
