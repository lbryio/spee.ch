import React from 'react';
import ErrorPage from '@pages/ErrorPage';
import ShowAssetLite from '@pages/ShowAssetLite';
import ShowAssetDetails from '@pages/ShowAssetDetails';
import ShowChannel from '@pages/ShowChannel';
import { withRouter, Redirect } from 'react-router-dom';

import {
  CHANNEL,
  ASSET_LITE,
  ASSET_DETAILS,
  SPECIAL_ASSET,
} from '../../constants/show_request_types';

class ContentPageWrapper extends React.Component {
  componentDidMount () {
    const { onHandleShowPageUri, match, homeChannel } = this.props;
    onHandleShowPageUri(homeChannel ? { claim: homeChannel } : match.params);
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params !== this.props.match.params) {
      this.props.onHandleShowPageUri(nextProps.match.params);
    }
  }
  render () {
    const { error, requestType, match } = this.props;
    const { params } = match;
    const { claim, identifier } = params;
    if (identifier) {
      return <Redirect to={`https://lbry.tv/${identifier}/${claim}`} />
    } else {
      return <Redirect to={`https://lbry.tv/${claim}`} />
    }
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
      case SPECIAL_ASSET:
        return <ShowChannel />;
      default:
        return <p>loading...</p>;
    }
  }
};

export default withRouter(ContentPageWrapper);
