import React from 'react';
import Helmet from 'react-helmet';
import NavBar from '@containers/NavBar/index';

class FourOhForPage extends React.Component {
  render () {
    const {title, host} = this.props;
    return (
      <div>
        <Helmet>
          <title>{title} - 404</title>
          <link rel='canonical' href={`${host}/404`} />
        </Helmet>
        <NavBar />
        <div className='row row--padded'>
          <h2>404</h2>
          <p>That page does not exist</p>
        </div>
      </div>
    );
  }
};

export default FourOhForPage;
