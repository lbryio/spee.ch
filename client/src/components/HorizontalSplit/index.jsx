import React from 'react';

class HorizontalSplit extends React.Component {
  shouldComponentUpdate () {
    return false;
  }
  render () {
    return (
      <div className={'horizontal-split'}>
        <div className={'column'}>
          {this.props.leftSide}
        </div>
        <div className={'column'}>
          {this.props.rightSide}
        </div>
      </div>
    );
  }
}

export default HorizontalSplit;
