import React, { Component } from 'react';
import Draggable from 'react-draggable';

let body;
try {
  body = document.body;
} catch(e) {}

export default class RichDraggable extends Component {
  constructor(props) {
    super(props);

    this.contents = React.createRef();
    this.state = {
      height: 0,
      width: 0,
    };
  }

  componentDidMount() {
    const height = this.contents.current.offsetHeight;
    const width = this.contents.current.offsetWidth;

    this.setState({
      height,
      width,
    });
  }

  render() {
    const me = this;

    const {
      props,
      state,
    } = me;

    const {
      height: bottom,
      width: right,
    } = props.bounds;

    const bounds = {
      //top: 0,
      //left: 0,
      right: right - state.width,
      bottom: bottom - state.height,
    };

    return (
      <Draggable {...props} bounds={bounds} offsetParent={body} cancel=".no-drag">
        <div ref={me.contents} style={{ border: '4px dashed rgba(0, 0, 0, .7)', cursor: 'move', position: 'absolute' }} className="creatifyDecor">
          <div style={{ border: '4px dashed rgba(255, 255, 255, .8)', margin: '-5px -3px -3px -5px', padding: '15px' }} className="creatifyDecor">
            <div className="no-drag" style={{ position: 'relative', cursor: 'auto' }}>
              {props.children}
            </div>
          </div>
        </div>
      </Draggable>
    );
  }
};
