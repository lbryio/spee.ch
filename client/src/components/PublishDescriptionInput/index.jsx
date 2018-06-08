import React from 'react';
import RowLabeled from '@components/RowLabeled';
import Label from '@components/Label';
import ExpandingTextArea from '@components/ExpandingTextArea';

const PublishDescriptionInput = ({ description, handleInput }) => {
  return (
    <RowLabeled
      label={
        <Label value={'Description:'} />
      }
      content={
        <ExpandingTextArea
          id='publish-description'
          className='textarea textarea--primary textarea--full-width'
          rows={1}
          maxLength={2000}
          style={{ maxHeight: 200 }}
          name='description'
          placeholder='Optional description'
          value={description}
          onChange={handleInput}
        />
      }
    />
  );
};

export default PublishDescriptionInput;
