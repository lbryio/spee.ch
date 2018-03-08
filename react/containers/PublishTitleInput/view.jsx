import React from 'react';

class PublishTitleInput extends React.Component {
  constructor (props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.props.onMetadataChange(name, value);
  }
  render () {
    return (
      <input type='text' id='publish-title' className='input-text text--large input-text--full-width' name='title' placeholder='Give your post a title...' onChange={this.handleInput} value={this.props.title} />
    );
  }
}

export default PublishTitleInput;
