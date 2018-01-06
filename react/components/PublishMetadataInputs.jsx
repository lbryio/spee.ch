import React from 'react';

class MetadataInputs extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showInputs: false,
    };
    this.toggleShowInputs = this.toggleShowInputs.bind(this);
  }
  toggleShowInputs () {
    if (this.state.showInputs) {
      this.setState({'showInputs': false});
    } else {
      this.setState({'showInputs': true});
    }
  }
  render () {
    return (
      <div>
        <div className="row row--padded row--no-top row--no-bottom row--wide">
          <div className="column column--10">
            <a className="label link--primary" id="publish-details-toggle" href="#" onClick={this.toggleShowInputs}>{this.state.showInputs ? '[hide]' : '[show]'}</a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = MetadataInputs;
