import React from 'react';
import { Link } from 'react-router-dom';
import Row from '@components/Row';

const AssetTitle = ({ title }) => {
  return (
    <Row>
      <h3>{title}</h3>
    </Row>
  );
};

export default AssetTitle;
