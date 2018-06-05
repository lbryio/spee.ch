import React from 'react';

const FormFeedbackDisplay = ({ errorMessage, defaultMessage }) => {
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

export default FormFeedbackDisplay;
