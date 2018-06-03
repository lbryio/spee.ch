import React from 'react';

class Column extends React.Component {
  shouldComponentUpdate () {
    return false;
  }
  render () {
    return (
      <div className={'column'}>
        {this.props.children}
      </div>
    );
  }
}

export default Column;
