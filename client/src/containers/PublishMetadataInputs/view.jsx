import React from 'react';
import PublishDescriptionInput from '@components/PublishDescriptionInput';
import PublishLicenseInput from '@components/PublishLicenseInput';
import PublishNsfwInput from '@components/PublishNsfwInput';
import ButtonSecondary from '@components/ButtonSecondary';

class PublishMetadataInputs extends React.Component {
  constructor (props) {
    super(props);
    this.toggleShowInputs = this.toggleShowInputs.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  toggleShowInputs () {
    this.props.onToggleMetadataInputs(!this.props.showMetadataInputs);
  }
  handleInput (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.props.onMetadataChange(name, value);
  }
  handleSelect (event) {
    const name = event.target.name;
    const selectedOption = event.target.selectedOptions[0].value;
    this.props.onMetadataChange(name, selectedOption);
  }
  render () {
    return (
      <div>
        {this.props.showMetadataInputs && (
          <div>
            <PublishDescriptionInput
              description={this.props.description}
              handleInput={this.handleInput}
            />
            <PublishLicenseInput
              handleSelect={this.handleSelect}
            />
            <PublishNsfwInput
              nsfw={this.props.nsfw}
              handleInput={this.handleInput}
            />
          </div>
        )}
        <ButtonSecondary
          value={this.props.showMetadataInputs ? 'less' : 'more'}
          onClickHandler={this.toggleShowInputs}
        />
      </div>
    );
  }
}

export default PublishMetadataInputs;
