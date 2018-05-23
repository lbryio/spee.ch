import React from 'react';
import { Link } from 'react-router-dom';

function Logo () {
  return (
    <svg version='1.1' id='Layer_1' x='0px' y='0px' height='24px' viewBox='0 0 80 31' enableBackground='new 0 0 80 31' className='nav-bar-logo'>
      <Link to='/'>
        <title>Logo</title>
        <desc>Spee.ch logo</desc>
        <g id='About'>
          <g id='Publish-Form-V2-_x28_filled_x29_' transform='translate(-42.000000, -23.000000)'>
            <g id='Group-17' transform='translate(42.000000, 22.000000)'>
              <text transform='matrix(1 0 0 1 0 20)' fontSize='25' fontFamily='Roboto'>Spee&lt;h</text>
              <g id='Group-16' transform='translate(0.000000, 30.000000)'>
                <path id='Line-8' fill='none' stroke='#09F911' strokeWidth='1' strokeLinecap='square' d='M0.5,1.5h15' />
                <path id='Line-8-Copy' fill='none' stroke='#029D74' strokeWidth='1' strokeLinecap='square' d='M16.5,1.5h15' />
                <path id='Line-8-Copy-2' fill='none' stroke='#E35BD8' strokeWidth='1' strokeLinecap='square' d='M32.5,1.5h15' />
                <path id='Line-8-Copy-3' fill='none' stroke='#4156C5' strokeWidth='1' strokeLinecap='square' d='M48.5,1.5h15' />
                <path id='Line-8-Copy-4' fill='none' stroke='#635688' strokeWidth='1' strokeLinecap='square' d='M64.5,1.5h15' />
              </g>
            </g>
          </g>
        </g>
      </Link>
    </svg>
  );
};

export default Logo;
