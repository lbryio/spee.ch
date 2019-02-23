import React from 'react';
import RowLabeled from '@components/RowLabeled';
import Label from '@components/Label';
import { CC_LICENSES } from '../../constants/publish_license_urls';

const PublishLicenseUrlInput = ({ handleSelect }) => {
  return (
    <RowLabeled
      label={
        <Label value={'License Url'} />
      }
      content={
        <select
          type='text'
          name='licenseUrl'
          id='publish-license-url'
          onChange={handleSelect}
        >
          <option value=''>Unspecified</option>
          {
            CC_LICENSES.map(function(item, i){
              return <option key={item.url} value={item.url}>{item.value}</option>
            })
          }
        </select>
      }
    />
  );
};

export default PublishLicenseUrlInput;
