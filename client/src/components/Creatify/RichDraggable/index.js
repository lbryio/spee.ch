import React, { Component } from 'react';

export default class RichDraggable extends Component {
  render() {
    return (
      <div style={{ margin: '-2px', position: 'absolute', border: '2px dashed blue' }}>
        {this.props.children}
      </div>
    );
  }
};
