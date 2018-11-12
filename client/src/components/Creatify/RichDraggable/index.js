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
      top: 0,
      left: 0,
      right: right - state.width,
      bottom: bottom - state.height,
    };

    console.log(bounds);

    return (
      <Draggable bounds={bounds} offsetParent={body} cancel=".no-drag">
        <div ref={me.contents} style={{ padding: '10px', position: 'absolute', border: '4px dashed #ddd', cursor: 'move' }}>
          <div className="no-drag" style={{ overflow: 'hidden', position: 'relative', cursor: 'auto' }}>
            {props.children}
          </div>
        </div>
      </Draggable>
    );
  }
};
