import React from 'react';

class Row extends React.Component {
  shouldComponentUpdate () {
    return false;
  }
  render () {
    return (
      <div className={'row'}>
        {this.props.children}
      </div>
    );
  }
}

export default Row;
