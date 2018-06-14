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
      <input
        type='text'
        id='publish-title'
        className={'text--extra-large input--full-width'}
        name='title'
        placeholder='Give your content a title...'
        onChange={this.handleInput}
        value={this.props.title} />
    );
  }
}

export default PublishTitleInput;
