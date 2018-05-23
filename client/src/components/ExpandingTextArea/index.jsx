import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpandingTextarea extends Component {
  constructor (props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
  }
  componentDidMount () {
    this.adjustTextarea({});
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
  render () {
    const { ...rest } = this.props;
    return (
      <textarea
        {...rest}
        ref={x => this.el = x}
        onChange={this._handleChange}
      />
    );
  }
}

ExpandingTextarea.propTypes = {
  onChange: PropTypes.func,
};

export default ExpandingTextarea;
