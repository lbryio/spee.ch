import React from 'react';

class SpaceAround extends React.Component {
  shouldComponentUpdate () {
    return false;
  }
  render () {
    return (
      <div className={'space-around'}>
        {this.props.children}
      </div>
    );
  }
}

export default SpaceAround;
