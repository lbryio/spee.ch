import React from 'react';

const ButtonPrimary  = ({ value, onClickHandler, type = 'button' }) => {
  return (
    <button
      type={type}
      className={'button button--primary'}
      onClick={onClickHandler}
    >
      {value}
    </button>
  );
};

export default ButtonPrimary;
