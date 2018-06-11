import React from 'react';
import HorizontalSplit from '@components/HorizontalSplit';
import Dropzone from '@containers/Dropzone';
import PublishDetails from '@containers/PublishDetails';
import PublishTitleInput from '@containers/PublishTitleInput';
import Row from '@components/Row';

class PublishPreview extends React.Component {
  render () {
    return (
      <div>
        <Row>
          <PublishTitleInput />
        </Row>
        <HorizontalSplit
          leftSide={<Dropzone />}
          rightSide={<PublishDetails />}
        />
      </div>
    );
  }
};

export default PublishPreview;
