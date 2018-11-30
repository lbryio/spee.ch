import React, { Component } from 'react';

const DEFAULT_TEXT_RENDER = (text) => text;

export default class EditableFontface extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blinkSelection: props.blinkSelection == false ? false : true,
      value: props.value,
    };

    this.textInput = React.createRef();
  }

  componentDidMount() {
    const textInput = this.textInput.current;

    if(textInput) {
      textInput.focus();
    }
  }

  render() {
    const me = this;

    const {
      blinkSelection,
      value
    } = me.state;

    const {
      editable = true,
      fontFace,
      preview,
    } = me.props;

    const textRender = fontFace.textRender || DEFAULT_TEXT_RENDER;

    const textStyles = Object.assign({
      ...(blinkSelection ? {
        animation: 'textBlink 1s infinite',
      } : {}),
      minHeight: '20px',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    }, fontFace.text, preview ? fontFace.previewOverrides : {});

    const fontInput = (editable === true) ? (
      <input ref={this.textInput} type="text" onKeyPress={(e) => me.onKeyPress(e)} onChange={(e) => me.onChange(e)} style={{
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
    ) : null;

    return (
      <div style={{ position: 'relative', ...(fontFace.container || {}) }}>
        <style scoped>{'@keyframes textBlink { 0% { opacity: 1 } 30% { opacity: 0.6 } 60% { opacity: 1 } }'}</style>
        {fontInput}
        <div ref={me.state.fontRender} style={textStyles} title={value}>{textRender(value)}</div>
      </div>
    );
  }

  onKeyPress(e) {
    this.setState({
      blinkSelection: false,
      value: e.target.value
    });
  }

  onChange(e) {
    this.setState({
      blinkSelection: false,
      value: e.target.value
    });
  }
};

export const PRESETS = {
  'Green Machine': require('../FontFaces/GreenMachine'),
  'Inferno': require('../FontFaces/Inferno'),
  'Lazer': require('../FontFaces/Lazer'),
  'Neon': require('../FontFaces/Neon'),
  'Old Blue': require('../FontFaces/OldBlue'),
  'Outline': require('../FontFaces/Outline'),
  'Retro Rainbow': require('../FontFaces/RetroRainbow'),
  'The Special': require('../FontFaces/TheSpecial'),
  'Vapor Wave': require('../FontFaces/VaporWave'),
}
