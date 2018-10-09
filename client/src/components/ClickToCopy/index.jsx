import React from 'react';
import * as Icon from 'react-feather';

class ClickToCopy extends React.Component {
  constructor (props) {
    super(props);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }
  copyToClipboard () {
    const elementToCopy = this.props.id;
    const element = document.getElementById(elementToCopy);
    console.log(elementToCopy);
    element.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      this.setState({error: 'Oops, unable to copy'});
    }
  }
  render () {
    const {id, value} = this.props;
    return (
      <div
        className='click-to-copy-wrap'
        onClick={this.copyToClipboard}
      >
        <input
          id={id}
          value={value}
          type='text'
          className='click-to-copy'
          readOnly
          spellCheck='false'
        />
        <Icon.Copy />
      </div>
    );
  }
}

export default ClickToCopy;
