import React from 'react';

class PublishDetailsRow extends React.Component {
  render () {
    return (
      <div className={'publish-details-row'}>
        <div className={'publish-details-label'}>{this.props.label}</div>
        <div className={'publish-details-content'}>{this.props.content}</div>
      </div>
    );
  }
}

export default PublishDetailsRow;
