import React from 'react';
import ErrorPage from 'pages/ErrorPage';
import ShowAssetLite from 'containers/ShowAssetLite';
import ShowAssetDetails from 'containers/ShowAssetDetails';
import ShowChannel from 'containers/ShowChannel';

import { CHANNEL, ASSET_LITE, ASSET_DETAILS } from 'constants/show_request_types';

class ShowPage extends React.Component {
  componentDidMount () {
    this.props.onHandleShowPageUri(this.props.match.params);
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params !== this.props.match.params) {
      this.props.onHandleShowPageUri(nextProps.match.params);
    }
  }
  render () {
    const { error, requestType } = this.props;
    if (error) {
      return (
        <ErrorPage error={error} />
      );
    }
    switch (requestType) {
      case CHANNEL:
        return <ShowChannel />;
      case ASSET_LITE:
        return <ShowAssetLite />;
      case ASSET_DETAILS:
        return <ShowAssetDetails />;
      default:
        return <p>loading...</p>;
    }
  }
};

export default ShowPage;
