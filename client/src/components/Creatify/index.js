import React, { Component } from 'react';
import Select from 'react-select'

import RichDraggable from './RichDraggable';
import EditableFontface, { PRESETS as FontPresets } from './EditableFontface';

// TODO: Remove `rasterizehtml` from SSR
let rasterizeHTML = () => {};
try {
  if(window) {
    rasterizeHTML = require('rasterizehtml')
  }
} catch(e) {}

export default class Creatify extends Component {
  constructor(props) {
    super(props);

    const fontKeys = Object.keys(FontPresets);

    this.canvas = React.createRef();
    this.contents = React.createRef();

    const fontOptions = fontKeys.map(
      (fontName) => (
        {
          value: fontName,
          label: <EditableFontface fontFace={FontPresets[fontName]} value={fontName} editable="false" />,
          fontName,
        }
      )
    );

    this.state = {
      bounds: {},
      fontName: fontKeys[0],
      fontOptions,
    };
  }

  componentDidMount() {
    const bounds = this.contents.current.getBoundingClientRect();

    this.setState({
      bounds,
    });
  }

  renderContents() {
    const me = this;

    const canvas = me.canvas.current;
    let contents = me.contents.current.innerHTML;

    // Resolves a bug in Chrome where it renders correctly, but
    // replaces the inline styles with an invalid `background-clip`
    contents = contents.replace(/background\-clip:(.*)[;$]/g,
      (match, group) => (`-webkit-background-clip:${group};${match}`)
    );

    rasterizeHTML.drawHTML(contents, canvas);
  }

  render() {
    const me = this;

    const {
      state,
    } = this;

    const options = [
      { value: 'chocolate', label: <div><b>Chocolate</b></div> },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' },
    ];

    return (
      <div style={{ flex: 1, display: 'flex' }}>
        <div>
          <button onClick={() => this.renderContents()}>Rasterize</button>
          <canvas ref={me.canvas} width="200" height="200"></canvas>
          <Select options={state.fontOptions} onChange={(option) => this.setFont(option.fontName)} />
        </div>
        <div ref={me.contents} style={{ flex: 1 }}>
          <RichDraggable bounds={state.bounds}>
            <EditableFontface fontFace={FontPresets[state.fontName]} value="Hello from LBRY" />
          </RichDraggable>
        </div>
      </div>
    );
  }

  setFont(fontName) {
   this.setState({
     fontName,
   });
  }
};
