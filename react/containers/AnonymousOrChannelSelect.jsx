import React from 'react';
import { setPublishInChannel } from '../actions/index';
import { connect } from 'react-redux';

class AnonymousOrChannelSelect extends React.Component {
  constructor (props) {
    super(props);
    this.toggleAnonymousPublish = this.toggleAnonymousPublish.bind(this);
  }
  toggleAnonymousPublish (event) {
    const value = event.target.value;
    if (value === 'anonymous') {
      this.props.onPublishInChannelChange(false);
    } else {
      this.props.onPublishInChannelChange(true);
    }
  }
  render () {
    return (
      <form>
        <div className="column column--3 column--med-10">
          <input type="radio" name="anonymous-or-channel" id="anonymous-radio" className="input-radio" value="anonymous" checked={!this.props.publishInChannel} onChange={this.toggleAnonymousPublish}/>
          <label className="label label--pointer" htmlFor="anonymous-radio">Anonymous</label>
        </div>
        <div className="column column--7 column--med-10">
          <input type="radio" name="anonymous-or-channel" id="channel-radio" className="input-radio" value="in a channel" checked={this.props.publishInChannel} onChange={this.toggleAnonymousPublish}/>
          <label className="label label--pointer" htmlFor="channel-radio">In a channel</label>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    publishInChannel: state.publishInChannel,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPublishInChannelChange: (value) => {
      dispatch(setPublishInChannel(value));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnonymousOrChannelSelect);
