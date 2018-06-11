import React from 'react';

class HorizontalTriSplit extends React.Component {
  render () {
    return (
      <div className={'horizontal-quad-split'}>
        <div className={'left-side'}>
          <div className={'column'}>
            {this.props.itemA}
          </div>
          <div className={'column'}>
            {this.props.itemB}
          </div>
        </div>
        <div className={'right-side'}>
          <div className={'column'}>
            {this.props.itemC}
          </div>
          <div className={'column'}>
            {this.props.itemD}
          </div>
        </div>
      </div>
    );
  }
}

export default HorizontalTriSplit;
