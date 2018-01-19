import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpandingTextarea extends Component {
  componentDidMount () {
    this._adjustTextarea({});
  }

  render () {
    const { onChange, maxHeight, ...rest } = this.props;
    return (
      <textarea
        { ...rest }
        ref={x => this.el = x}
        onChange={ this._handleChange.bind(this) }
      />
    );
  }

  _handleChange (e) {
    const { onChange } = this.props;
    if (onChange) onChange(e);
    this._adjustTextarea(e);
  }

  _adjustTextarea ({ target = this.el }) {
    target.style.height = 0;
    if (this.props.maxHeight) {
      target.style.height = `${Math.min(target.scrollHeight, this.props.maxHeight)}px`;
    } else {
      target.style.height = `${target.scrollHeight}px`;
    }
  }
}

ExpandingTextarea.propTypes = {
  onChange : PropTypes.func,
  maxHeight: PropTypes.number,
};

export default ExpandingTextarea;
