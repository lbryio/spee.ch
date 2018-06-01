import React from 'react';
import HorizontalSplit from '@components/HorizontalSplit';
import Dropzone from '@containers/Dropzone';
import PublishDetails from '@containers/PublishDetails';
import PublishTitleInput from '@containers/PublishTitleInput';

class PublishPreview extends React.Component {
  render () {
    return (
      <div>
        <PublishTitleInput />
        <HorizontalSplit
          leftSide={<Dropzone />}
          rightSide={<PublishDetails />}
        />
      </div>
    );
  }
};

export default PublishPreview;
