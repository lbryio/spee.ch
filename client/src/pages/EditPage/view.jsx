import React from 'react';
import PageLayout from '@components/PageLayout';
import { Redirect } from 'react-router-dom';
import PublishTool from '@containers/PublishTool';

class EditPage extends React.Component {
  componentDidMount () {
    const {asset, match, onHandleShowPageUri, setUpdateTrue, updateMetadata} = this.props;
    onHandleShowPageUri(match.params);
    setUpdateTrue();
    if (asset) {
      ['title', 'description', 'license', 'nsfw'].forEach(meta => updateMetadata(meta, asset.claimData[meta]));
    }
  }
  componentWillUnmount () {
    this.props.clearFile();
  }
  render () {
    const { myChannel, asset } = this.props;
    // redirect if user does not own this claim
    if (
      !myChannel || (
        asset &&
        asset.claimsData &&
        asset.claimsData.channelName &&
        asset.claimsData.channelName !== myChannel
      )
    ) {
      return (<Redirect to={'/'} />);
    }
    return (
      <PageLayout
        pageTitle={'Edit claim'}
        pageUri={'edit'}
      >
        <PublishTool />
      </PageLayout>
    );
  }
};

export default EditPage;
