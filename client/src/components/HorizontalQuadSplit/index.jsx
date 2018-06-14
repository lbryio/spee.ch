import React from 'react';
import Row from '@components/Row';

class HorizontalTriSplit extends React.Component {
  render () {
    return (
      <div className={'horizontal-quad-split'}>
        <div className={'left-side'}>
          <div className={'column-a'}>
            <Row>
              {this.props.columnA}
            </Row>
          </div>
          <div className={'column-b'}>
            <Row>
              {this.props.columnB}
            </Row>
          </div>
        </div>
        <div className={'right-side'}>
          <div className={'column-c'}>
            <Row>
              {this.props.columnC}
            </Row>
          </div>
          <div className={'column-d'}>
            <Row>
              {this.props.columnD}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default HorizontalTriSplit;
