import React from 'react';
import PageLayout from '@components/PageLayout';
import PublishTool from '@containers/PublishTool';
import ContentPageWrapper from '@pages/ContentPageWrapper';

class HomePage extends React.Component {
  // componentDidMount () {
  //   this.props.onHandleShowHomepage(this.props.match.params);
  // }
  //
  // componentWillReceiveProps (nextProps) {
  //   if (nextProps.match.params !== this.props.match.params) {
  //     this.props.onHandleShowHomepage(nextProps.match.params);
  //   }
  // }

  componentWillUnmount () {
    this.props.clearFile();
  }
  render () {
    const { homeChannel } = this.props;
    return homeChannel ? (
      <ContentPageWrapper homeChannel={homeChannel} />
    ) : (
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
