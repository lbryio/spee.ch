import React from 'react';
import ExpandingTextArea from 'components/ExpandingTextArea';

class PublishMetadataInputs extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showInputs: false,
    };
    this.toggleShowInputs = this.toggleShowInputs.bind(this);
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
    this.handleNsfwCheck = this.handleNsfwCheck.bind(this);
    this.handleLicenseSelection = this.handleLicenseSelection.bind(this);
  }
  toggleShowInputs () {
    this.setState({'showInputs': !this.state.showInputs});
  }
  handleDescriptionInput (event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.props.onMetadataChange(name, value);
  }
  handleNsfwCheck (event) {
    console.log('handle input', event);
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.checked;
    this.props.onMetadataChange(name, value);
  }
  handleLicenseSelection (event) {
    const name = event.target.name;
    const selectedOption = event.target.selectedOptions[0].value;
    this.props.onMetadataChange(name, selectedOption);
  }
  render () {
    return (
      <div id="publish-details" className="row row--padded row--no-top row--wide">
        <a className="label link--primary" id="publish-details-toggle" href="#" onClick={this.toggleShowInputs}>{this.state.showInputs ? '[less]' : '[more]'}</a>
      {this.state.showInputs && (
        <div>
          <div className="row row--no-top">
            <div className="column column--3 column--med-10 align-content-top">
              <label htmlFor="publish-license" className="label">Description:</label>
            </div><div className="column column--7 column--sml-10">
              <ExpandingTextArea
                id="publish-description"
                className="textarea textarea--primary textarea--full-width"
                rows={1}
                maxLength={2000}
                maxHeight={150}
                name="description"
                placeholder="Optional description"
                value={this.props.description}
                style={{height: this.state.descriptionHeight}}
                onChange={this.handleDescriptionInput} />
            </div>
          </div>

          <div className="row row--no-top">
            <div className="column column--3 column--med-10">
              <label htmlFor="publish-license" className="label">License:</label>
            </div><div className="column column--7 column--sml-10">
              <select type="text" name="license" id="publish-license" className="select select--primary" onChange={this.handleLicenseSelection}>
                <option value=" ">Unspecified</option>
                <option value="Public Domain">Public Domain</option>
                <option value="Creative Commons">Creative Commons</option>
              </select>
            </div>
          </div>

          <div className="row row--no-top">
            <div className="column column--3">
              <label htmlFor="publish-nsfw" className="label">Mature:</label>
            </div><div className="column column--7">
              <input className="input-checkbox" type="checkbox" id="publish-nsfw" name="nsfw" checked={this.props.nsfw} onChange={this.handleNsfwCheck} />
            </div>
          </div>
        </div>
      )}
      </div>
    );
  }
}

export default PublishMetadataInputs;
