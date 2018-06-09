import React from 'react';

class VerticalSplit extends React.Component {
  render () {
    return (
      <div className={'vertical-split'}>
        {this.props.top}
        {this.props.bottom}
      </div>
    );
  }
}

export default VerticalSplit;
