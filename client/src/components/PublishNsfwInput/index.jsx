import React from 'react';
import RowLabeled from '@components/RowLabeled';
import Label from '@components/Label';

const PublishNsfwInput = ({ nsfw, handleInput }) => {
  return (
    <RowLabeled
      label={
        <Label value={'Mature:'} />
      }
      content={
        <input
          className='input-checkbox'
          type='checkbox'
          id='publish-nsfw'
          name='nsfw'
          value={nsfw}
          onChange={handleInput}
        />
      }
    />
  );
};

export default PublishNsfwInput;
