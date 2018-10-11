import React from 'react';
import * as Icon from 'react-feather';
class VerticalCollapsibleSplit extends React.Component {

  constructor (props) {
    super(props);
    this.collapse = this.collapse.bind(this);
    this.state = { open: true };
  }

  collapse () {
    this.setState({ open: !this.state.open });
    document.getElementById(this.props.name).classList.toggle('hidden');
  }

  render () {
    return (
      <div className={'vertical-split'}>
        <div className='visible-content'>
          {this.props.top}
          <button className='collapse-button' onClick={this.collapse}>
            {this.state.open ? <Icon.PlusSquare /> : <Icon.MinusSquare /> }
          </button>
        </div>
        <div className='collapse-content' id={this.props.name}>
          {this.props.bottom}
        </div>
      </div>
    );
  }
};

export default VerticalCollapsibleSplit;
