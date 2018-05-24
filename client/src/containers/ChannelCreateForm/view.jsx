import React from 'react';
import ProgressBar from '@components/ProgressBar';

class ChannelCreateForm extends React.Component {
  constructor (props) {
    super(props);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  cleanseNameInput (input) {
    input = input.replace(/\s+/g, '-'); // replace spaces with dashes
    input = input.replace(/[^A-Za-z0-9-]/g, '');  // remove all characters that are not A-Z, a-z, 0-9, or '-'
    return input;
  }
  cleansePasswordInput (input) {
    input = input.replace(/\s+/g, ''); // replace spaces
    return input;
  }
  handleNameInput (event) {
    let value = this.cleanseNameInput(event.target.value);
    if (!value) {
      this.props.updateChannelCreateName('error', 'Please enter a channel name');
    } else {
      this.props.updateChannelAvailability(value);
    }
    this.props.updateChannelCreateName('value', value);
  }
  handlePasswordInput (event) {
    let value = this.cleansePasswordInput(event.target.value);
    if (!value){
      this.props.updateChannelCreatePassword('error', 'Please enter a password');
    } else {
      this.props.updateChannelCreatePassword('error', null);
    }
    this.props.updateChannelCreatePassword('value', value);
  }
  handleSubmit (event) {
    console.log('handling submit');
    event.preventDefault();
    this.props.createChannel();
  }
  returnErrors () {
    if (this.props.name.error) {
      return this.props.name.error;
    }
    if (this.props.password.error) {
      return this.props.password.error;
    }
    return null;
  }
  render () {
    const { name, password, status } = this.props;
    const formError = this.returnErrors();
    return (
      <div>
        { !status ? (
          <form id='publish-channel-form'>
            <div className='row row--wide row--short'>
              <div className='column column--3 column--sml-10'>
                <label className='label' htmlFor='new-channel-name'>Name:</label>
              </div><div className='column column--6 column--sml-10'>
                <div className='input-text--primary flex-container--row flex-container--left-bottom span--relative'>
                  <span>@</span>
                  <input type='text' name='channel' id='new-channel-name' className='input-text' placeholder='exampleChannelName' value={name.value} onChange={this.handleNameInput} />
                  { (name.value && !name.error) && <span id='input-success-channel-name' className='info-message--success span--absolute'>{'\u2713'}</span> }
                  { name.error && <span id='input-success-channel-name' className='info-message--failure span--absolute'>{'\u2716'}</span> }
                </div>
              </div>
            </div>
            <div className='row row--wide row--short'>
              <div className='column column--3 column--sml-10'>
                <label className='label' htmlFor='new-channel-password'>Password:</label>
              </div><div className='column column--6 column--sml-10'>
                <div className='input-text--primary'>
                  <input type='password' name='password' id='new-channel-password' className='input-text'  placeholder='' value={password.value} onChange={this.handlePasswordInput} />
                </div>
              </div>
            </div>
            {formError ? (
              <p className='info-message--failure'>{formError}</p>
            ) : (
              <p className='info-message'>Choose a name and password for your channel</p>
            )}
            <div className='row row--wide'>
              <button className='button--primary' onClick={this.handleSubmit}>Create Channel</button>
            </div>
          </form>
        ) : (
          <div>
            <p className='fine-print'>{status}</p>
            <ProgressBar size={12} />
          </div>
        )}
      </div>
    );
  }
}

export default ChannelCreateForm;
