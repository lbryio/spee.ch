import React from 'react';

import style from './style.css.js';

class HorizontalSplit extends React.Component {
  shouldComponentUpdate () {
    return false;
  }
  render () {
    return (
      <div style={style.wrapper}>
        <div style={style.column}>
          {this.props.leftSide}
        </div>
        <div style={style.column}>
          {this.props.rightSide}
        </div>
      </div>
    );
  }
}

export default HorizontalSplit;
