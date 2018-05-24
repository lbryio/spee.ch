import React from 'react';
import ExpandingTextArea from '@components/ExpandingTextArea';

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
      <div id='publish-details' className='row row--padded row--no-top row--wide'>
        {this.props.showMetadataInputs && (
          <div>
            <div className='row row--no-top'>
              <div className='column column--3 column--med-10 align-content-top'>
                <label htmlFor='publish-license' className='label'>Description:</label>
              </div><div className='column column--7 column--sml-10'>
                <ExpandingTextArea
                  id='publish-description'
                  className='textarea textarea--primary textarea--full-width'
                  rows={1}
                  maxLength={2000}
                  style={{ maxHeight: 200 }}
                  name='description'
                  placeholder='Optional description'
                  value={this.props.description}
                  onChange={this.handleInput} />
              </div>
            </div>

            <div className='row row--no-top'>
              <div className='column column--3 column--med-10'>
                <label htmlFor='publish-license' className='label'>License:</label>
              </div><div className='column column--7 column--sml-10'>
                <select type='text' name='license' id='publish-license' className='select select--primary' onChange={this.handleSelect}>
                  <option value=' '>Unspecified</option>
                  <option value='Public Domain'>Public Domain</option>
                  <option value='Creative Commons'>Creative Commons</option>
                </select>
              </div>
            </div>

            <div className='row row--no-top'>
              <div className='column column--3'>
                <label htmlFor='publish-nsfw' className='label'>Mature:</label>
              </div><div className='column column--7'>
                <input className='input-checkbox' type='checkbox' id='publish-nsfw' name='nsfw' value={this.props.nsfw} onChange={this.handleInput} />
              </div>
            </div>
          </div>
        )}
        <button className='button--secondary' onClick={this.toggleShowInputs}>{this.props.showMetadataInputs ? 'less' : 'more'}</button>
      </div>
    );
  }
}

export default PublishMetadataInputs;
