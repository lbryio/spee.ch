import React from 'react';
import NavBar from 'containers/NavBar';
import AssetTitle from 'components/AssetTitle';
import AssetDisplay from 'components/AssetDisplay';
import AssetInfo from 'components/AssetInfo';

class ShowDetailsPage extends React.Component {
  componentDidMount () {
    console.log(this.props);
  }
  render () {
    return (
      <div>
        <NavBar/>
        <div className="row row--tall row--padded">
          <div className="column column--10">
            <AssetTitle title={'test title'}/>
          </div>
          <div className="column column--5 column--sml-10 align-content-top">
            <div className="row row--padded">
              <AssetDisplay/>
            </div>
          </div><div className="column column--5 column--sml-10 align-content-top">
          <div className="row row--padded">
            <AssetInfo />
          </div>
        </div>
        </div>
      </div>
    );
  }
};

export default ShowDetailsPage;
