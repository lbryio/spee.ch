import React from 'react';

const ButtonPrimary  = ({ value, onClickHandler }) => {
  return (
    <button
      className={'button button--secondary'}
      onClick={onClickHandler}
    >
      {value}
    </button>
  );
};

export default ButtonPrimary;
