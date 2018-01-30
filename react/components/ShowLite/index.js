import React from 'react';
import AssetDisplay from 'components/AssetDisplay';

class ShowLitePage extends React.Component {
  render () {
    return (
      <div className="row row--tall flex-container--column flex-container--center-center">
        <AssetDisplay
          claimName={this.props.claimName}
          claimId={this.props.claimId}
        />
      </div>
    );
  }
};

export default ShowLitePage;
