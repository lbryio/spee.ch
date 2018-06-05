import React from 'react';

class SpaceBetween extends React.Component {
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

export default SpaceBetween;
