import React from 'react';
import AssetDisplay from 'components/AssetDisplay';

class ShowLitePage extends React.Component {
  render () {
    return (
      <div className="row row--tall flex-container--column flex-container--center-center">
        <AssetDisplay />
      </div>
    );
  }
};

export default ShowLitePage;
