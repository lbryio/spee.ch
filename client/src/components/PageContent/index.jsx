import React from 'react';

class PageContent extends React.Component {
  shouldComponentUpdate () {
    return false;
  }
  render () {
    return (
      <div className={'page-content'}>
        {this.props.children}
      </div>
    );
  }
}

export default PageContent;
