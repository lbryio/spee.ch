import React from 'react';

class MetadataInputs extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showInputs : false,
      description: null,
    };
    this.toggleShowInputs = this.toggleShowInputs.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  toggleShowInputs () {
    if (this.state.showInputs) {
      this.setState({'showInputs': false});
    } else {
      this.setState({'showInputs': true});
    }
  }
  handleInput (event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.props.updateUploaderState(name, value);
  }
  render () {
    return (
      <div>
        <div className="row row--padded row--no-top row--no-bottom row--wide">
          <div className="column column--10">
            <a className="label link--primary" id="publish-details-toggle" href="#" onClick={this.toggleShowInputs}>{this.state.showInputs ? '[less]' : '[more]'}</a>
          </div>
        {this.state.showInputs && (
          <div id="publish-details" className="row row--padded row--wide">

            <div className="row row--no-top">
              <div className="column column--3 column--med-10 align-content-top">
                <label htmlFor="publish-license" className="label">Description:</label>
              </div><div className="column column--7 column--sml-10">
                <textarea rows="1" id="publish-description" className="textarea textarea--primary textarea--full-width" name="description" placeholder="Optional description" onChange={this.handleInput}>{this.state.description}</textarea>
              </div>
            </div>

            <div className="row row--no-top">
              <div className="column column--3 column--med-10">
                <label htmlFor="publish-license" className="label">License:</label>
              </div><div className="column column--7 column--sml-10">
                <select type="text" id="publish-license" className="select select--primary">
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
                <input className="input-checkbox" type="checkbox" id="publish-nsfw" />
              </div>
            </div>

          </div>
        )}
        </div>
      </div>
    );
  }
}

module.exports = MetadataInputs;
