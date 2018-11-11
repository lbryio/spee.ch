import React, { Component } from 'react';

const DEFAULT_TEXT_RENDER = (text) => text;

export default class EditableFontface extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  render() {
    const me = this;

    const {
      value
    } = me.state;

    const {
      fontFace,
    } = me.props;

    const textRender = fontFace.textRender || DEFAULT_TEXT_RENDER;

    const textStyles = {
      ...{
        minHeight: '30px',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      ...(fontFace.text),
    };

    return (
      <div style={{ position: 'relative' }}>
        <input type="text" onKeyPress={(e) => me.onKeyPress(e)} onChange={(e) => me.onChange(e)} style={{
          ...{
            bottom: 0,
            opacity: 0,
            padding: 0,
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
            zIndex: 1,
          },
          ...(fontFace.editorStyle || {}),
        }} />
        <div style={textStyles} title={value}>{textRender(value)}</div>
      </div>
    );
  }

  onKeyPress(e) {
    this.setState({ value: e.target.value });
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }
};

export const PRESETS = {
  'Retro Rainbow': require('./FontFaces/RetroRainbow'),
  'Green Machine': require('./FontFaces/GreenMachine'),
}
