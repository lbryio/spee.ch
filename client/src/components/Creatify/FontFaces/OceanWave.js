import React from 'react';

module.exports = {
  container: {},
  editorStyle: {},
  text: {},
  textRender: (text) => {
    // TODO: Inline the path
    const id = `curve-${text.replace(/[^A-Za-z0-9]/g, '')}-oceanwave`
    return (
      <svg viewBox="0 0 425 300" style={{ height: '10em' }}>
        <path id={id} fill="transparent" d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145" />
        <text x="25">
          <textPath href={`#${id}`}>
            {text}
          </textPath>
        </text>
      </svg>
    );
  },
};
