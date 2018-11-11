import React, { Component } from 'react';

import RichDraggable from './RichDraggable';
import EditableFontface, { PRESETS as FontPresets } from './EditableFontface';

export default class Creatify extends Component {
  constructor(props) {
    super(props);

    const fontKeys = Object.keys(FontPresets);

    this.state = {
      fontName: fontKeys[0],
      fontOptions: fontKeys.map((fontName) => (
        <option value={fontName}>{fontName}</option>
      )),
    };
  }

  render() {
    const {
      state,
    } = this;

    return (
      <div style={{ flex: 1 }}>
        <select value={state.fontName} onChange={(e) => this.onChangeFont(e)}>
          {state.fontOptions}
        </select>
        <RichDraggable>
          <EditableFontface fontFace={FontPresets[state.fontName]} value="Hello from LBRY" />
        </RichDraggable>
      </div>
    );
  }

  onChangeFont(event) {
   this.setState({
     fontName: event.target.value,
   });
  }
};
