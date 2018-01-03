import React from 'react';
import Preview from './preview.jsx';

class Title extends React.Component {
  constructor (props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput (e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    this.props.updateUploaderState(name, value);
  }
  render () {
    return (
      <input type="text" id="publish-title" className="input-text text--large input-text--full-width" placeholder="Give your post a title..." onChange={this.handleInput} value={this.props.title}/>
    );
  }
}

class Channel extends React.Component {
  render () {
    return (
      <div>
        <h3>channel component</h3>
      </div>
    );
  }
}

class Url extends React.Component {
  render () {
    return (
      <div>
        <h3>url component</h3>
      </div>
    );
  }
}

class Thumbnail extends React.Component {
  render () {
    return (
      <div>
        <h3>thumbnail component</h3>
      </div>
    );
  }
}

class Details extends React.Component {
  render () {
    return (
      <div>
        <h3>details component</h3>
      </div>
    );
  }
}

class PublishDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showThumbnailSelector: false,
    }
    // set defaults
    this.updateUploaderState = this.updateUploaderState.bind(this);
    this.showThumbnailTool = this.showThumbnailTool.bind(this);
    this.hideThumbnailTool = this.hideThumbnailTool.bind(this);
    this.publish = this.publish.bind(this);
    this.cancelPublish = this.cancelPublish.bind(this);
  }
  updateUploaderState (name, value) {
    this.props.updateUploaderState(name, value);
  }
  showThumbnailTool () {
    this.setState({showThumbnailSelector: true});
  }
  hideThumbnailTool () {
    this.setState({showThumbnailSelector: false});
  }
  publish () {
    // publish the asset
  }
  cancelPublish () {
    // cancel this publish
  }
  render () {
    return (
      <div className="row row--padded row--no-bottom">
        <div className="column column--10">
          <Title title={this.props.title} updateUploaderState={this.updateUploaderState}/>
        </div>
        <div className="column column--5 column--sml-10" >
          <div className="row row--padded">
            <Preview
              file={this.props.file}
              hideThumbnailTool={this.hideThumbnailTool}
              showThumbnailTool={this.showThumbnailTool}
            />
          </div>
        </div>
        <div className="column column--5 column--sml-10 align-content-top">
          <div id="publish-active-area" className="row row--padded">
            <Channel />
            <Url file={this.props.file}/>
            { this.state.showThumbnailSelector && <Thumbnail thumbnail={this.props.thumbnail}/> }
            <Details />

            <div className="row row--padded row--wide">
              <div className="input-error" id="input-error-publish-submit" hidden="true">{this.props.inputError}</div>
              <button id="publish-submit" className="button--primary button--large" onClick={this.publish}>Upload</button>
            </div>

            <div className="row row--short align-content-center">
              <button className="button--cancel" onClick={this.cancelPublish}>Cancel</button>
            </div>

            <div className="row row--short align-content-center">
              <p className="fine-print">By clicking 'Upload', you affirm that you have the rights to publish this content to the LBRY network, and that you understand the properties of publishing it to a decentralized, user-controlled network. <a className="link--primary" target="_blank" href="https://lbry.io/learn">Read more.</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

module.exports = PublishDetails;
