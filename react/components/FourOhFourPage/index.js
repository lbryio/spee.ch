import React from 'react';
import NavBar from 'containers/NavBar';

class FourOhForPage extends React.Component {
  render () {
    return (
      <div>
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
