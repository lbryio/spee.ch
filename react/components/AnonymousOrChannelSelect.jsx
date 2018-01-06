import React from 'react';

class AnonymousOrChannelSelect extends React.Component {
  constructor (props) {
    super(props);
    this.toggleAnonymousPublish = this.toggleAnonymousPublish.bind(this);
  }
  toggleAnonymousPublish (event) {
    const value = event.target.value;
    if (value === 'anonymous') {
      this.props.updateUploaderState('publishToChannel', false);
    } else {
      this.props.updateUploaderState('publishToChannel', true);
    }
  }
  render () {
    return (
      <div className="row row--padded row--short row--wide">
        <div className="column column--10">
          <form>
            <div className="column column--3 column--med-10">
              <input type="radio" name="anonymous-or-channel" id="anonymous-radio" className="input-radio" value="anonymous" checked={!this.props.publishToChannel} onChange={this.toggleAnonymousPublish}/>
              <label className="label label--pointer" htmlFor="anonymous-radio">Anonymous</label>
            </div>
            <div className="column column--7 column--med-10">
              <input type="radio" name="anonymous-or-channel" id="channel-radio" className="input-radio" value="in a channel" checked={this.props.publishToChannel} onChange={this.toggleAnonymousPublish}/>
              <label className="label label--pointer" htmlFor="channel-radio">In a channel</label>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

module.exports = AnonymousOrChannelSelect;
