import React from 'react';

class HorizontalSplit extends React.Component {
  render () {
    const { leftSide, rightSide, collapseOnMobile } = this.props;

    let className = 'horizontal-split';
    if (collapseOnMobile) {
      className += " horizontal-split--mobile-collapse";
    }

    // If there is no left side, move the right side to the left
    // This is mostly for content with no description
    // It doesn't need to be on the right side with nothing next to it.
    const leftComponent = leftSide || rightSide;
    const rightComponent = leftSide ? rightSide : null;

    return (
      <div className={className}>
        <div className={'horizontal-split__column horizontal-split__column--left'}>
          {leftComponent}
        </div>
        <div className={'horizontal-split__column horizontal-split__column--right'}>
          {rightComponent}
        </div>
      </div>
    );
  }
}

export default HorizontalSplit;
