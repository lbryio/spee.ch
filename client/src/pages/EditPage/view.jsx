import React from 'react';
import PageLayout from '@components/PageLayout';
import { Redirect } from 'react-router-dom';
import PublishTool from '@containers/PublishTool';

class EditPage extends React.Component {
  componentDidMount () {
    const {asset, isUpdate, match, onHandleShowPageUri, clearFile, setUpdateTrue, updateMetadata} = this.props;
    if (!isUpdate) {
      clearFile();
      onHandleShowPageUri(match.params);
      setUpdateTrue();
      if (asset) {
        ['title', 'description', 'license', 'nsfw'].forEach(meta => updateMetadata(meta, asset.claimData[meta]));
      }
    }
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
