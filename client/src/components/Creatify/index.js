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

const getRasterizedCanvas = (contents, width, height) => {
  return new Promise((resolve) => {
    // Resolves a bug in Chrome where it renders correctly, but
    // replaces the inline styles with an invalid `background-clip`.
    if(/Chrome/.test(navigator.userAgent)) {
      contents = contents.replace(/background\-clip:(.*)[;$]/g,
        (match, group) => (`-webkit-background-clip:${group};${match}`)
      );
    }

    // Attempt to match font kerning with the DOM.
    contents = '<style>svg{font-kerning:normal}</style>' + contents;

    rasterizeHTML.drawHTML(contents, document.createElement('canvas'), {
      width,
      height,
    }).then((renderResult) => {
      const pixelRatio = 2;

      // Why do this? Because Firefox doesn't always give us what we expect
      // `background-clip: text` is very broken and does not always render in time.
      let img = document.createElement('img');
      let canvas = document.createElement('canvas');

      img.height = canvas.height = height * pixelRatio;
      img.width = canvas.width = width * pixelRatio;
      canvas.style.height = `${height}px`;
      canvas.style.width = `${width}px`;

      let shadowNode = document.createElement('div');
      Object.assign(shadowNode.style, {
        height: 0,
        overflow: 'hidden',
        width: 0,
      });
      document.body.appendChild(shadowNode);

      shadowNode.appendChild(img);
      //document.body.appendChild(canvas);

      var svg64 = btoa(unescape(encodeURIComponent(renderResult.svg)));
      var b64Start = 'data:image/svg+xml;base64,';
      var image64 = b64Start + svg64;
      img.addEventListener('load', () => {
        window.requestAnimationFrame(() => {
          // We still can't trust Firefox's %$%&* engine, add another 5ms timeout
          setTimeout(() => {
            let context = canvas.getContext('2d', { alpha: false });
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = 'white';
            context.imageSmoothingEnabled = false;
            context.scale(pixelRatio, pixelRatio);
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);

            document.body.removeChild(shadowNode);

            resolve(canvas);
          }, 10);
        });
      });
      img.src = image64;
    });
  });
};

export default class Creatify extends Component {
  constructor(props) {
    super(props);

    const fontKeys = Object.keys(FontPresets);

    this.contents = React.createRef();

    const fontOptions = fontKeys.map(
      (fontName) => (
        {
          value: fontName,
          label: (
            <div style={{ maxHeight: '150px', maxWidth: '100%', fontSize: '16px', overflow: 'hidden' }}>
              <EditableFontface key={fontName} fontFace={FontPresets[fontName]} value={fontName} editable="false" />
            </div>
          ),
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

    let contents = me.contents.current.outerHTML;

    console.log(contents)
    // Cheap border/handles removal
    contents = `<style>.creatifyDecor{border-color:transparent!important;background-color:transparent!important}</style>` + contents;

    getRasterizedCanvas(contents, 600, 500).then((element) => {
      console.log(element);
      document.body.appendChild(element);
    });
  }

  render() {
    const me = this;

    const {
      state,
    } = this;

    return (
      <div style={{ flex: 1, display: 'flex' }}>
        <div>
          <button onClick={() => this.renderContents()}>Rasterize</button>
          <Select isSearchable={false} options={state.fontOptions} onChange={(option) => this.setFont(option.fontName)} />
        </div>
        <div ref={me.contents} style={{ height: '600px', width: '500px', fontSize: '22px', overflow: 'hidden', transform: 'translateZ(0)' }}>
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
