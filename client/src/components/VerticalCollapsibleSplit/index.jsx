import React from 'react';

class VerticalCollapsibleSplit extends React.Component {
  render () {
    return (
      <div className={'vertical-split'}>
        <div className='visible-content'>
          {this.props.top}
        </div>
        <div className='collapse-content'>
          {this.props.bottom}
        </div>
      </div>
    );
  }
}

export default VerticalCollapsibleSplit;
