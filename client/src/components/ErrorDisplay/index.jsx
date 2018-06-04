import React from 'react';

const ErrorDisplay = ({ errorMessage, defaultMessage }) => {
  return (
    <div>
      { errorMessage ? (
        <p className='info-message--failure'>{errorMessage}</p>
      ) : (
        <p className='info-message'>{defaultMessage}</p>
      )}
    </div>
  );
};

export default ErrorDisplay;
