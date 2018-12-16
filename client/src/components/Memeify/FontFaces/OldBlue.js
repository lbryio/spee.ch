import React from 'react';

const charToFullWidth = char => {
	const c = char.charCodeAt( 0 )
	return c >= 33 && c <= 126
		? String.fromCharCode( ( c - 33 ) + 65281 )
		: char
}

export default {
  container: {},
  editorStyle: {},
  text: {
    fontFamily: 'Segoe UI,Helvetica,Arial',
  },
	previewOverrides: {
		height: '2.6rem',
		overflow: 'hidden',
	},
  textRender: (text) => {
    const id = `curve-${text.replace(/[^A-Za-z0-9]/g, '')}-oceanwave`
    return (
      <svg viewBox="0 0 500 50" style={{ height: '4em', fontFamily: 'Arial', fontWeight: 'bold' }}>
				<path id={id} fill="transparent" d="M 0 50 Q 50 0 100 50 Q 150 100 200 50 Q 250 0 300 50 Q 350 100 400 50 Q 450 0 500 50 Q 550 100 600 50 " transform="scale(1 0.5) translate(0 15)" />
        <text x="10" style={{ fill: '#4dc2fe', fontWeight: 900, letterSpacing: '-0.15em', textShadow: '0.15em -0.1em #1c55a0' }}>
          <textPath xlinkHref={`#${id}`}>
            {text}
          </textPath>
        </text>
				<text x="10" style={{ fill: 'transparent', stroke: '#1c55a0', strokeWidth: '.012em', fontWeight: 900, letterSpacing: '-0.15em' }}>
          <textPath xlinkHref={`#${id}`}>
            {text}
          </textPath>
        </text>
      </svg>
    );
  },
};
