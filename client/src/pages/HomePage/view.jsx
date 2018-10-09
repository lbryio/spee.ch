import React from 'react';
import PageLayout from '@components/PageLayout';

import PublishTool from '@containers/PublishTool';

class HomePage extends React.Component {
  componentDidMount () {
    this.props.onHandleShowHomepage(this.props.match.params);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params !== this.props.match.params) {
      this.props.onHandleShowHomepage(nextProps.match.params);
    }
  }

  render () {
    return (
      <PageLayout
        pageTitle={'Speech'}
        pageUri={''}
      >
        <PublishTool />
      </PageLayout>
    );
  }
};

export default HomePage;
