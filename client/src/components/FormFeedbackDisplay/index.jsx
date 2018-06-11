import React from 'react';

const FormFeedbackDisplay = ({ errorMessage, defaultMessage }) => {
  return (
    <div className={'form-feedback'}>
      { errorMessage ? (
        <p className={'text--small text--failure'}>{errorMessage}</p>
      ) : (
        <div>
          { defaultMessage ? (
            <p className={'text--small text--secondary'}>{defaultMessage}</p>
          ) : (
            <p className={'text--small'}>&nbsp;</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FormFeedbackDisplay;
