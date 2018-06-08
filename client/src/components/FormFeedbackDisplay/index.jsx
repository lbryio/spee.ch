import React from 'react';

const FormFeedbackDisplay = ({ errorMessage, defaultMessage }) => {
  return (
    <div>
      { errorMessage ? (
        <div className={'form-feedback--failure'}>
          <p className='small'>{errorMessage}</p>
        </div>
      ) : (
        <div className={'form-feedback'}>
          <p className='small'>{defaultMessage}</p>
        </div>
      )}
    </div>
  );
};

export default FormFeedbackDisplay;
