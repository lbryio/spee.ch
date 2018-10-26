import React from 'react';
import * as Icon from 'react-feather';
class VerticalCollapsibleSplit extends React.Component {

  constructor (props) {
    super(props);
    this.collapse = this.collapse.bind(this);
    this.state = { closed: false };
  }

  collapse () {
    this.setState({ closed: !this.state.closed });
    document.querySelectorAll(`[data-name='${this.props.name}']`).forEach(el => el.classList.toggle('closed'));
  }

  render () {
    let {
      props,
      state,
    } = this;

    return (
      <div className={'vertical-split'}>
        <div className='visible-content' data-name={props.name}>
          {props.top}
          <button className='collapse-button' onClick={this.collapse}>
            {state.closed ? <Icon.PlusCircle className='plus-icon' /> : <Icon.MinusCircle />}
          </button>
        </div>
        <div className='collapse-content' data-name={props.name}>
          {props.bottom}
        </div>
      </div>
    );
  }
};

export default VerticalCollapsibleSplit;
