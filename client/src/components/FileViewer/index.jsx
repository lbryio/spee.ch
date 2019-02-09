import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { serving } from '@config/siteConfig.json';

const { markdownSettings: { escapeHtmlMain, skipHtmlMain, allowedTypesMain } } = serving;
class FileViewer extends React.Component {

  constructor (props) {
    super(props);
    /*
      Prevent memory leak by closing fetch before unmount
     */
    this.abortController = new AbortController();
    this.abortSignal = this.abortController.signal;
    this.state = {
      fileLoaded: false,
      fileText  : '',
    };
  }

  componentDidMount () {
    const {sourceUrl} = this.props;
    const signal = this.abortSignal;
    fetch(sourceUrl, { signal })
      .then(response => response.text())
      .then((text) => {
        this.setState({fileText: text});
        this.setState({fileLoaded: true});
        return true;
      })
      .catch(e => { console.log('fetch aborted on unmount ', e) });
  }

  componentWillUnmount () {
    this.abortController.abort();
  }

  render () {
    return (
      <div className={'markdown'}>
        {
          this.state.fileLoaded &&
          <ReactMarkdown className={'markdown-preview'} source={this.state.fileText} skipHtml={skipHtmlMain} allowedTypes={allowedTypesMain} escapeHtml={escapeHtmlMain} />
        }
        {
          !this.state.fileLoaded &&
          <p>Loading your file...</p>
        }
      </div>
    );
  }
}

export default FileViewer;
