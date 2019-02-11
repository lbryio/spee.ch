import React from 'react';
import PageLayout from '@components/PageLayout';
import * as Icon from 'react-feather';
import AssetDisplay from '@containers/AssetDisplay';
import AssetBlocked from '@containers/AssetBlocked';
import AssetInfo from '@containers/AssetInfo';
import ErrorPage from '@pages/ErrorPage';
import AssetTitle from '@containers/AssetTitle';

class ShowAssetDetails extends React.Component {

  constructor (props) {
    super(props);
    this.collapse = this.collapse.bind(this);
    // this.storageKey = 'vert-split-state-' + this.props.name;
    // const closed = window && window.localStorage
    //   ? !!window.localStorage.getItem(this.storageKey) : false;
    const closed = true;
    this.state = { closed: closed };
  }

  collapse () {
    this.setState({ closed: !this.state.closed });
    // if (window && window.localStorage) {
    //   window.localStorage.setItem(this.storageKey, !this.state.closed);
    // }
    // document.querySelectorAll(`[data-name='${this.props.name}']`).forEach(el => el.classList.toggle('closed'));
  }

  render () {
    const { asset } = this.props;
    if (asset) {
      const { claimData: { name, blocked } } = asset;
      if (!blocked) {
        return (
          <PageLayout
            pageTitle={`${name} - details`}
            asset={asset}
          >
            <div className="asset-main">
              <AssetTitle />
              <AssetDisplay />
              <div>
                <button className='collapse-button' onClick={this.collapse}>
                  {this.state.closed ? <Icon.PlusCircle className='plus-icon' /> : <Icon.MinusCircle />}
                </button>
              </div>
            </div>
            {!this.state.closed && <AssetInfo />}

          </PageLayout>
        );
      } else {
        return (
          <PageLayout>
            <div className="asset-main">
              <AssetBlocked />
            </div>
          </PageLayout>
        );
      }
    }
    return (
      <ErrorPage error={'loading asset data...'} />
    );
  }
};

export default ShowAssetDetails;
