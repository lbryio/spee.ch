import React from 'react';

class RowLabeledAlt extends React.Component {
  render () {
    return (
      <div className={'row-labeled-alt'}>
        <div className={'row-labeled-label'}>{this.props.label}</div>
        <div className={'row-labeled-content'}>{this.props.content}</div>
      </div>
    );
  }
}

export default RowLabeledAlt;
