import React from 'react';

class SpaceBetween extends React.Component {
  render () {
    return (
      <div className={'space-between'}>
        {this.props.children}
      </div>
    );
  }
}

export default SpaceBetween;
