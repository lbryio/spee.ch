import React from 'react';

class TitleInput extends React.Component {
  constructor (props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput (e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.props.updateUploaderState(name, value);
  }
  render () {
    return (
      <input type="text" id="publish-title" className="input-text text--large input-text--full-width" name="title" placeholder="Give your post a title..." onChange={this.handleInput} value={this.props.title}/>
    );
  }
}

module.exports = TitleInput;
