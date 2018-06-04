import React from 'react';
import PublishDetailsRow from '@components/PublishDetailsRow';
import Label from '@components/Label';

const PublishLicenseInput = ({ handleSelect }) => {
  return (
    <PublishDetailsRow
      label={
        <Label value={'License:'} />
      }
      content={
        <select
          type='text'
          name='license'
          id='publish-license'
          className='select select--primary'
          onChange={handleSelect}
        >
          <option value=' '>Unspecified</option>
          <option value='Public Domain'>Public Domain</option>
          <option value='Creative Commons'>Creative Commons</option>
        </select>
      }
    />
  );
};

export default PublishLicenseInput;
