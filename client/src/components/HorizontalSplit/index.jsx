import React from 'react';

class HorizontalSplit extends React.Component {
  render () {
    return (
      <div className={'horizontal-split'}>
        <div className={'horizontal-split__column horizontal-split__column--left'}>
          {this.props.leftSide}
        </div>
        <div className={'horizontal-split__column horizontal-split__column--right'}>
          {this.props.rightSide}
        </div>
      </div>
    );
  }
}

export default HorizontalSplit;
