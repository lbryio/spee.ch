import React from 'react';
import HorizontalSplit from '@components/HorizontalSplit';
import Dropzone from '@containers/Dropzone';
import PublishDetails from '@containers/PublishDetails';
import PublishTitleInput from '@containers/PublishTitleInput';
import Row from '@components/Row';

// this class seems more like PublishForm and should probably be renamed

class PublishPreview extends React.Component {
  render () {
    const { isUpdate, uri } = this.props;
    return (
      <div className={'publish-form'}>
        <div className={'publish-form__title'}>
          <Row>
            {isUpdate && uri && (<p className='text--secondary'>{`Editing ${uri}`}</p>)}
            <PublishTitleInput />
          </Row>
        </div>
        <HorizontalSplit
          leftSide={<Dropzone />}
          rightSide={<PublishDetails />}
        />
      </div>
    );
  }
};

export default PublishPreview;
