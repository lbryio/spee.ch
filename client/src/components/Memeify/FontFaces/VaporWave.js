import React from 'react';

const charToFullWidth = char => {
	const c = char.charCodeAt( 0 )
	return c >= 33 && c <= 126
		? String.fromCharCode( ( c - 33 ) + 65281 )
		: char
}

const stringToFullWidth =

module.exports = {
  container: {
		overflow: 'hidden',
	},
  editorStyle: {},
  text: {
    fontFamily: 'Segoe UI,Helvetica,Arial',
  },
	previewOverrides: {
		transform: 'rotate(39deg)',
    height: '7rem',
    paddingLeft: '2rem',
	  margin: '-2rem 0',
	},
  textRender: (text) => {
    const formattedText = text.toLowerCase().split('').map((char) => {
      const c = char.charCodeAt( 0 )
      return (c >= 33 && c <= 126) ? String.fromCharCode(c + 65248) : char
    }).join('');

    // TODO: Inline the path
    const id = `curve-${text.replace(/[^A-Za-z0-9]/g, '')}-oceanwave`
    return (
      <svg viewBox="0 0 500 160" style={{ height: '10em' }}>
        <path id={id} fill="transparent" d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145" />
        <text x="10">
          <textPath href={`#${id}`}>
            {formattedText}
          </textPath>
        </text>
      </svg>
    );
  },
};
