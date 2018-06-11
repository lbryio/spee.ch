import React from 'react';

class SpaceAround extends React.Component {
  render () {
    return (
      <div className={'space-around'}>
        {this.props.children}
      </div>
    );
  }
}

export default SpaceAround;
