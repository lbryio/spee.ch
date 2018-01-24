import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpandingTextarea extends Component {
  componentDidMount () {
    this.adjustTextarea({});
  }

  render () {
    const { onChange, ...rest } = this.props;
    return (
      <textarea
        { ...rest }
        ref={x => this.el = x}
        onChange={ this._handleChange.bind(this) }
      />
    );
  }

  _handleChange (event) {
    const { onChange } = this.props;
    if (onChange) onChange(event);
    this.adjustTextarea(event);
  }

  adjustTextarea ({ target = this.el }) {
    target.style.height = 0;
    target.style.height = `${target.scrollHeight}px`;
  }
}

ExpandingTextarea.propTypes = {
  onChange: PropTypes.func,
};

export default ExpandingTextarea;
