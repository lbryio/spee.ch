import React from 'react';
import HorizontalSplit from '@components/HorizontalSplit';
import Dropzone from '@containers/Dropzone';
import PublishDetails from '@containers/PublishDetails';
import PublishTitleInput from '@containers/PublishTitleInput';
import Row from '@components/Row';

class PublishPreview extends React.Component {
  render () {
    const { isUpdate, uri } = this.props;
    return (
      <div>
        <Row>
          {isUpdate && uri && (<p className='text--extra-small'>{`Editing ${uri}`}</p>)}
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
