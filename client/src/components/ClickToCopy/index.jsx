import React from 'react';

class ClickToCopy extends React.Component {
  constructor (props) {
    super(props);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }
  copyToClipboard (event) {
    console.log('event:', event);
    console.log('event.target:', event.target);
    console.log('event.target.id:', event.target.id);
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
