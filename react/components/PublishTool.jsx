import React from 'react';
import PublishDropzone from './PublishDropzone.jsx';
import PublishForm from './PublishForm.jsx';
import PublishStatus from './PublishStatus.jsx';
import {connect} from 'react-redux';

class PublishTool extends React.Component {
  constructor (props) {
    super(props);
    // bind class methods with `this`
    this.updateUploaderState = this.updateUploaderState.bind(this);
    this.makeGetRequest = this.makeGetRequest.bind(this);
    this.makePostRequest = this.makePostRequest.bind(this);
    this.cleanseInput = this.cleanseInput.bind(this);
    this.getCookie = this.getCookie.bind(this);
  }
  componentDidMount () {
    // check for whether a channel is logged in
    // if so, setState loggedInChannel to the channel name
    const loggedInChannelName = this.getCookie('channel_name');
    this.setState({loggedInChannelName})
    const loggedInChannelShortId = this.getCookie('short_channel_id');
    this.setState({loggedInChannelShortId});
  }
  updateUploaderState (name, value) {
    console.log(`updateUploaderState ${name} ${value}`);
    this.setState({[name]: value});
  }
  makeGetRequest (url) {
    return new Promise((resolve, reject) => {
      let xhttp = new XMLHttpRequest();
      xhttp.open('GET', url, true);
      xhttp.responseType = 'json';
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            resolve(xhttp.response);
          } else if (xhttp.status === 401) {
            reject('Wrong channel name or password');
          } else {
            reject('request failed with status:' + xhttp.status);
          };
        }
      };
      xhttp.send();
    });
  }
  makePostRequest (url, params) {
    return new Promise((resolve, reject) => {
      let xhttp = new XMLHttpRequest();
      xhttp.open('POST', url, true);
      xhttp.responseType = 'json';
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            resolve(xhttp.response);
          } else if (xhttp.status === 401) {
            reject('Wrong channel name or password');
          } else {
            reject('request failed with status:' + xhttp.status);
          };
        }
      };
      xhttp.send(params);
    });
  }
  cleanseInput (input) {
    input = input.replace(/\s+/g, '-'); // replace spaces with dashes
    input = input.replace(/[^A-Za-z0-9-]/g, '');  // remove all characters that are not A-Z, a-z, 0-9, or '-'
    return input;
  }
  getCookie (cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
  render () {
    return (
      <div className="row row--tall flex-container--column">
        { !this.props.file &&
          <PublishDropzone
            updateUploaderState={this.updateUploaderState}
            cleanseInput={this.cleanseInput}
          />
        }
        { this.props.file &&
          <PublishForm
            updateUploaderState={this.updateUploaderState}
            clearUploaderState={this.clearUploaderState}
            makeGetRequest={this.makeGetRequest}
            makePostRequest={this.makePostRequest}
            cleanseInput={this.cleanseInput}
          />
        }
        { this.props.publishStatus &&
          <PublishStatus />
        }
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    file: state.file,
  };
};

export default connect(mapStateToProps, null)(PublishTool);
