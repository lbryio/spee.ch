import React from 'react';
import NavBar from 'containers/NavBar';

class ShowChannel extends React.Component {
  componentDidMount () {
    console.log(this.props);
  }
  render () {
    return (
      <div>
        <NavBar/>
        <div className="row row--tall row--padded">
          <div className="column column--10">
            <h2>channelName: {this.props.channelName}</h2>
            <h2>channelClaimId: {this.props.channelClaimId}</h2>
          </div>
          <div class="row row--padded">
            <div class="row">

              {((this.props.totalPages === 0) &&
              <p>There is no content in {this.props.channelName}:{this.props.longChannelClaimId} yet. Upload some!
              </p>)}

              {((this.props.totalPages >= 1) &&
              <div>
                <p>Below are the contents for {this.channelName}:{this.longChannelClaimId}</p>
                <div>
                  {/* claims here */}
                </div>
              </div>)}

            </div>
          </div>
        </div>
      </div>
    );
  }
};

// required props
// channelName
// channelLongClaimId
// channelShortClaimId
// totalPages
// claims

export default ShowChannel;
