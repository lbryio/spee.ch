import React from 'react';
import RowLabeled from '@components/RowLabeled';
import Label from '@components/Label';
import { LICENSES } from '../../constants/publish_license_urls';

const PublishLicenseInput = ({ handleSelect }) => {
  return (
    <RowLabeled
      label={
        <Label value={'License'} />
      }
      content={
        <select
          type='text'
          name='license'
          id='publish-license'
          onChange={handleSelect}
        >
          <option value=''>Unspecified</option>
          {
            LICENSES.map(function(item, i){
              return <option key={item + 'license key'} value={item}>{item}</option>;
            })
          }
        </select>
      }
    />
  );
};

export default PublishLicenseInput;
