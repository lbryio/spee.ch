import React from 'react';

const FormFeedbackDisplay = ({ errorMessage, defaultMessage }) => {
  return (errorMessage || defaultMessage) ? (
    <div className={'form-feedback'}>
      { errorMessage ? (
        <span className={'text--small text--failure'}>{errorMessage}</span>
      ) : (
        <div>
          { defaultMessage ? (
            <span className={'text--small text--secondary'}>{defaultMessage}</span>
          ) : (
            <span className={'text--small'}>&nbsp;</span>
          )}
        </div>
      )}
    </div>
  ) : null;
};

export default FormFeedbackDisplay;
