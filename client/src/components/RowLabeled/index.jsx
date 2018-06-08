import React from 'react';

class RowLabeled extends React.Component {
  render () {
    return (
      <div className={'row-labeled'}>
        <div className={'row-labeled-label'}>{this.props.label}</div>
        <div className={'row-labeled-content'}>{this.props.content}</div>
      </div>
    );
  }
}

export default RowLabeled;
