import React from 'react';
import RowLabeled from '@components/RowLabeled';
import Label from '@components/Label';

const PublishLicenseInput = ({ handleSelect }) => {
  return (
    <RowLabeled
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
          <option value=''>Unspecified</option>
          <option value='Public Domain'>Public Domain</option>
          <option value='Creative Commons'>Creative Commons</option>
        </select>
      }
    />
  );
};

export default PublishLicenseInput;
