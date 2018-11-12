import React from 'react';
import ChannelCreateNameInput from '@components/ChannelCreateNameInput';
import ChannelCreatePasswordInput from '@components/ChannelCreatePasswordInput';
import ButtonPrimary from '@components/ButtonPrimary';
import FormFeedbackDisplay from '@components/FormFeedbackDisplay';
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
    if (!value) {
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
          <form className="form-group" onSubmit={this.handleSubmit}>
            <ChannelCreateNameInput
              value={name.value}
              error={name.error}
              handleNameInput={this.handleNameInput}
            />
            <ChannelCreatePasswordInput
              value={password.value}
              handlePasswordInput={this.handlePasswordInput}
            />
            <FormFeedbackDisplay errorMessage={formError} />
            <ButtonPrimary
              type={'submit'}
              value={'Create Channel'}
              onClickHandler={this.handleSubmit}
            />
        </form>
        ) : (
          <div>
            <span className={'text--small text--secondary'}>{status}</span>
            <ProgressBar size={12} />
          </div>
        )}
      </div>
    );
  }
}

export default ChannelCreateForm;
