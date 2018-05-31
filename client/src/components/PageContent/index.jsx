import React from 'react';

import style from './style.css.js';

class PageContent extends React.Component {
  shouldComponentUpdate () {
    return false;
  }
  render () {
    return (
      <div style={style} className={'row--tall flex-container--column'}>
        {this.props.children}
      </div>
    );
  }
}

export default PageContent;
