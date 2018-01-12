import React from 'react';
import ProgressBar from '../components/ProgressBar.jsx';

const LOAD_START = 'LOAD_START';
const LOADING = 'LOADING';
const PUBLISHING = 'PUBLISHING';
const SUCCESS = 'SUCCESS';
const FAILED = 'FAILED';

function PublishStatus ({ status, message }) {
  return (
    <div className="row row--tall flex-container--column flex-container--center-center">
      {(status === LOAD_START) &&
        <div className="row align-content-center">
          <p>File is loading to server</p>
          <p className="blue">{message}</p>
        </div>
      }
      {(status === LOADING) &&
      <div>
        <div className="row align-content-center">
          <p>File is loading to server</p>
          <p className="blue">{message}</p>
        </div>
      </div>
      }
      {(status === PUBLISHING) &&
      <div className="row align-content-center">
        <p>Upload complete.  Your file is now being published on the blockchain...</p>
        <ProgressBar/>
        <p>Curious what magic is happening here? <a className="link--primary" target="blank" href="https://lbry.io/faq/what-is-lbry">Learn more.</a></p>
      </div>
      }
      {(status === SUCCESS) &&
      <div className="row align-content-center">
        {message}
      </div>
      }
      {(status === FAILED) &&
      <div className="row align-content-center">
        <p>Something went wrong...</p>
        <p><strong>{message}</strong></p>
        <p>For help, post the above error text in the #speech channel on the <a className="link--primary" href="https://discord.gg/YjYbwhS" target="_blank">lbry discord</a></p>
      </div>
      }
    </div>
  );
};

export default PublishStatus;
