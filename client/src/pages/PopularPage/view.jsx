import React from 'react';
import ContentPageWrapper from '@pages/ContentPageWrapper';

class PopularPage extends React.Component {
  componentDidMount () {
    this.props.onHandleShowHomepage(this.props.match.params);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params !== this.props.match.params) {
      this.props.onHandleShowHomepage(nextProps.match.params);
    }
  }

  render () {
    const { homeChannel } = this.props;
    return (
      <ContentPageWrapper homeChannel={homeChannel} />
    )
  }
};

export default PopularPage;
