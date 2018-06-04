import React from 'react';
import PublishDetailsRow from '@components/PublishDetailsRow';
import Label from '@components/Label';

const PublishNsfwInput = ({ nsfw, handleInput }) => {
  return (
    <PublishDetailsRow
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
