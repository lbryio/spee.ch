import React from 'react';

class ClickToCopy extends React.Component {
  constructor (props) {
    super(props);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }
  copyToClipboard (event) {
    const elementToCopy = event.target.id;
    const element = document.getElementById(elementToCopy);
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
      <input
        id={id}
        value={value}
        onClick={this.copyToClipboard}
        type='text'
        className='click-to-copy'
        readOnly
        spellCheck='false'
      />
    );
  }
}

export default ClickToCopy;
