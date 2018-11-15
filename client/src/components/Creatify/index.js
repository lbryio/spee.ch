import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { Component } from 'react';
import Select from 'react-select'

import RichDraggable from './RichDraggable';
import EditableFontface, { PRESETS as FontPresets } from './EditableFontface';

import {
  faFont,
  faMinusCircle,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

const getRasterizedCanvas = (contents, width, height) => {
  return new Promise((resolve) => {
    // Parse to xHTML for SVG/foreignObject rendering
    contents = new XMLSerializer().serializeToString(
      new DOMParser().parseFromString(contents, 'text/html')
    );

    // Resolves a bug in Chrome where it renders correctly, but
    // replaces the inline styles with an invalid `background-clip`.
    if(/Chrome/.test(navigator.userAgent)) {
      contents = contents.replace(/background\-clip:(\s*text\s*)[;$]/g,
        (match, group) => (`-webkit-background-clip:text;${match}`)
      );
    }

    // Attempt to match font kerning with the DOM.
    const kerningAndPadding = '<style>svg{font-kerning:normal}body{padding:0;margin:0}</style>';
    const svgContents = `<svg xmlns="http://www.w3.org/2000/svg" width="${width * 2}" height="${height * 2}">
<foreignObject x="0" y="0" width="${width * 2}" height="${height * 2}" externalResourcesRequired="true">
<html xmlns="http://www.w3.org/1999/xhtml"><head>${kerningAndPadding}</head><body>${contents}</body></html>
</foreignObject></svg>`;

    const pixelRatio = 2;

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

    var svg64 = btoa(unescape(encodeURIComponent(svgContents)));
    var b64Start = 'data:image/svg+xml;base64,';
    var image64 = b64Start + svg64;
    img.addEventListener('load', () => {
      window.requestAnimationFrame(() => {
        // We still can't trust Firefox's %$%&* engine, add another 5ms timeout
        // `background-clip: text` is very broken and does not always render in time.
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
      activeElement: false,
      bounds: {},
      fontName: fontKeys[0],
      elements: [],
      fontOptions,
    };
  }

  componentDidMount() {
    // TODO: Fix bounds
    /*
    const bounds = this.contents.current.getBoundingClientRect();

    this.setState({
      bounds,
    });

    console.log({
      bounds
    })
    */
  }

  setActiveElement(activeElement) {
    this.setState({ activeElement });
  }

  addElement() {
    const {
      state
    } = this;

    const newElementKey = `element-${state.elements.length}-${Date.now()}`;

    const newElement = (
      <RichDraggable key={newElementKey} bounds={state.bounds} onStart={() => this.setActiveElement(newElement)}>
        <EditableFontface fontFace={FontPresets[state.fontName]} value="Hello from LBRY" />
      </RichDraggable>
    );

    this.setState({
      elements: [...state.elements, newElement],
      activeElement: newElement,
    });
  }

  removeElement() {
    const {
      state
    } = this;

    const activeElementIndex = state.elements.indexOf(state.activeElement);

    if(state.elements.length === 0 || activeElementIndex === -1) {
      return;
    }

    const elements = [...state.elements];
    elements.splice(activeElementIndex, 1)

    this.setState({
      activeElement: false,
      elements,
    });
  }

  async onSave() {
    const renderedCanvas = await this.renderContentsToCanvas();

    if(this.props.onSave) {
      this.props.onSave(renderedCanvas);
    }
  }

  async renderContentsToCanvas() {
    const me = this;

    const contentsElement = me.contents.current;
    let contents = contentsElement.outerHTML;

    // Cheap border/handles removal
    contents = `<style>.creatifyDecor{border-color:transparent!important;background-color:transparent!important}</style>` + contents;

    const contentsWidth = contentsElement.offsetWidth;
    const contentsHeight = contentsElement.offsetHeight;

    // Fix the dimensions, fixes when flex is used.
    contents = `<div style="height:${contentsHeight}px;width:${contentsWidth}px">${contents}</div>`;

    return await getRasterizedCanvas(contents, contentsWidth, contentsHeight);
  }

  render() {
    const me = this;
    const {
      props,
      state,
    } = this;

    // TODO: Abstract into separate package & use CSS Modules.
    const spacerCss = { width: '.3em' };
    return (
      <div style={{ position: 'relative', flex: props.flex === true ? 1 : props.flex, display: props.flex ? 'flex' : 'block' }}>
        <div className={props.toolbarClassName} style={{ alignItems: 'center', color: '#fff', display: 'flex', padding: '.3em', position: 'absolute', top: 0, left: 0, right: 0, background: '#333', flexDirection: 'row', zIndex: 2 }}>
          <FontAwesomeIcon icon={faPlusCircle} size="2x" onClick={() => this.addElement()} />
          <div style={spacerCss} />
          <FontAwesomeIcon icon={faMinusCircle} size="2x" onClick={() => this.removeElement()} />
          <div style={spacerCss} />
          <div style={{ flex: 1 }}>
            <Select style={{ flex: 1 }} isSearchable={false} options={state.fontOptions} onChange={(option) => this.setFont(option.fontName)} />
          </div>
          <div style={spacerCss} />
          <div onClick={() => this.onSave()} style={{ alignItems: 'center', alignSelf: 'stretch', color: '#fff', border: '1px solid #fff', display: 'flex', padding: '0 0.6em' }}>
            <span>Save</span>
          </div>
        </div>
        <div ref={me.contents} style={{ fontSize: '22px', overflow: 'hidden', transform: 'translateZ(0)', flex: 1 }}>
          {state.elements}
          {props.children}
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
