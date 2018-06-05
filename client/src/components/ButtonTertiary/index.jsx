import React from 'react';

const ButtonTertiary  = ({ value, onClickHandler }) => {
  return (
    <button
      className={'button button--tertiary'}
      onClick={onClickHandler}
    >
      {value}
    </button>
  );
};

export default ButtonTertiary;
