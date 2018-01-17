import React from 'react';
import { connect } from 'react-redux';
import { updateMetadata } from '../actions/index';

/*
  const textarea = document.getElementById('publish-description');
  const limit = 200;
  textarea.oninput = () => {
    textarea.style.height = '';
    textarea.style.height = Math.min(textarea.scrollHeight, limit) + 'px';
  }
*/

class MetadataInputs extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showInputs       : false,
      descriptionLimit : 100,
      descriptionHeight: '',
    };
    this.toggleShowInputs = this.toggleShowInputs.bind(this);
    this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
    this.handleNsfwCheck = this.handleNsfwCheck.bind(this);
    this.handleLicenseSelection = this.handleLicenseSelection.bind(this);
    this.setDescriptionTextBoxHeight = this.setDescriptionTextBoxHeight.bind(this);
  }
  toggleShowInputs () {
    this.setState({'showInputs': !this.state.showInputs});
  }
  handleDescriptionInput (event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.props.onMetadataChange(name, value);
    this.setDescriptionTextBoxHeight(event);
  }
  setDescriptionTextBoxHeight (event) {
    const scrollHeight = event.target.scrollHeight;
    // console.log('scrollHeight:', scrollHeight);
    const height = Math.min(scrollHeight, this.state.descriptionLimit) + 'px';
    this.setState({descriptionHeight: height});
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
              <textarea
                rows="1"
                id="publish-description"
                className="textarea textarea--primary textarea--full-width"
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

const mapStateToProps = state => {
  return {
    description: state.metadata.description,
    license    : state.metadata.license,
    nsfw       : state.metadata.nsfw,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMetadataChange: (name, value) => {
      dispatch(updateMetadata(name, value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetadataInputs);
