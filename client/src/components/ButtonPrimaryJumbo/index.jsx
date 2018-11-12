import React from 'react';

const ButtonPrimaryJumbo  = ({ value, onClickHandler }) => {
  return (
    <button
      className={'button button--primary button--jumbo'}
      onClick={onClickHandler}
    >
      {value}
    </button>
  );
};

export default ButtonPrimaryJumbo;
