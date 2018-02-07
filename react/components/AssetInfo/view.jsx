import React from 'react';
import { Link } from 'react-router-dom';

class AssetInfo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showDetails: false,
    };
    this.toggleDetails = this.toggleDetails.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }
  toggleDetails () {
    if (this.state.showDetails) {
      return this.setState({showDetails: false});
    }
    this.setState({showDetails: true});
  }
  copyToClipboard (event) {
    var elementToCopy = event.target.dataset.elementtocopy;
    var element = document.getElementById(elementToCopy);
    element.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      this.setState({error: 'Oops, unable to copy'});
    }
  }
  render () {
    const { shortId, channelName, certificateId, description, name, claimId, fileExt, contentType, thumbnail, host } = this.props;
    return (
      <div>
        {channelName &&
        <div className="row row--padded row--wide row--no-top">
          <div className="column column--2 column--med-10">
            <span className="text">Channel:</span>
          </div>
          <div className="column column--8 column--med-10">
            <span className="text"><a href={`/${channelName}:${certificateId}`}>{channelName}</a></span>
          </div>
        </div>
        }

        {description &&
        <div className="row row--padded row--wide row--no-top">
          <span className="text">{description}</span>
        </div>
        }

        <div className="row row--padded row--wide row--no-top">
          <div id="show-short-link">
            <div className="column column--2 column--med-10">
              <Link className="link--primary" to={`/${shortId}/${name}.${fileExt}`}><span
                className="text">Link:</span></Link>
            </div>
            <div className="column column--8 column--med-10">
              <div className="row row--short row--wide">
                <div className="column column--7">
                  <div className="input-error" id="input-error-copy-short-link" hidden="true">error here</div>
                  <input type="text" id="short-link" className="input-disabled input-text--full-width" readOnly
                         spellCheck="false"
                         value={`${host}/${shortId}/${name}.${fileExt}`}
                         onClick={this.select}/>
                </div>
                <div className="column column--1"> </div>
                <div className="column column--2">
                  <button className="button--primary" data-elementtocopy="short-link"
                          onClick={this.copyToClipboard}>copy
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="show-embed-code">
            <div className="column column--2 column--med-10">
              <span className="text">Embed:</span>
            </div>
            <div className="column column--8 column--med-10">
              <div className="row row--short row--wide">
                <div className="column column--7">
                  <div className="input-error" id="input-error-copy-embed-text" hidden="true">error here</div>
                  {(contentType === 'video/mp4') ? (
                    <input type="text" id="embed-text" className="input-disabled input-text--full-width" readOnly
                           onClick={this.select} spellCheck="false"
                           value={`<video width="100%" controls poster="${thumbnail}" src="${host}/${claimId}/${name}.${fileExt}"/></video>`}/>
                  ) : (
                    <input type="text" id="embed-text" className="input-disabled input-text--full-width" readOnly
                           onClick={this.select} spellCheck="false"
                           value={`<img src="${host}/${claimId}/${name}.${fileExt}"/>`}
                    />
                  )}
                </div>
                <div className="column column--1"> </div>
                <div className="column column--2">
                  <button className="button--primary" data-elementtocopy="embed-text"
                          onClick={this.copyToClipboard}>copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="show-share-buttons">
          <div className="row row--padded row--wide row--no-top">
            <div className="column column--2 column--med-10">
              <span className="text">Share:</span>
            </div>
            <div className="column column--7 column--med-10">
              <div
                className="row row--short row--wide flex-container--row flex-container--space-between-bottom flex-container--wrap">
                <a className="link--primary" target="_blank"
                   href={`https://twitter.com/intent/tweet?text=${host}/${shortId}/${name}`}>twitter</a>
                <a className="link--primary" target="_blank"
                   href={`https://www.facebook.com/sharer/sharer.php?u=${host}/${shortId}/${name}`}>facebook</a>
                <a className="link--primary" target="_blank"
                   href={`http://tumblr.com/widgets/share/tool?canonicalUrl=${host}/${shortId}/${name}`}>tumblr</a>
                <a className="link--primary" target="_blank"
                   href={`https://www.reddit.com/submit?url=${host}/${shortId}/${name}&title=${name}`}>reddit</a>
              </div>
            </div>
          </div>
        </div>

        { this.state.showDetails &&
        <div>
          <div className="row--padded row--wide row--no-top">
            <div>
              <div className="column column--2 column--med-10">
                <span className="text">Claim Name:</span>
              </div><div className="column column--8 column--med-10">
              {name}
            </div>
            </div>
            <div>
              <div className="column column--2 column--med-10">
                <span className="text">Claim Id:</span>
              </div><div className="column column--8 column--med-10">
              {claimId}
            </div>
            </div>
            <div>
              <div className="column column--2 column--med-10">
                <span className="text">File Type:</span>
              </div><div className="column column--8 column--med-10">
              {contentType ? `${contentType}` : 'unknown'}
            </div>
            </div>
          </div>
          <div className="row--padded row--wide row--no-top">
            <div className="column column--10">
              <a target="_blank" href="https://lbry.io/dmca">Report</a>
            </div>
          </div>
        </div>
        }
        <div className="row row--wide">
          <button className="button--secondary" onClick={this.toggleDetails}>{this.state.showDetails ? 'less' : 'more'}</button>
        </div>
      </div>
    );
  }
};

export default AssetInfo;
