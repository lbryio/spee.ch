import React from 'react';
import PropTypes from 'prop-types';
import ActiveStatusBar from '../ActiveStatusBar';
import InactiveStatusBar from '../InactiveStatusBar';

class ProgressBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      bars       : [],
      index      : 0,
      incrementer: 1,
    };
    this.createBars = this.createBars.bind(this);
    this.startProgressBar = this.startProgressBar.bind(this);
    this.updateProgressBar = this.updateProgressBar.bind(this);
    this.stopProgressBar = this.stopProgressBar.bind(this);
  }
  componentDidMount () {
    this.createBars();
    this.startProgressBar();
  }
  componentWillUnmount () {
    this.stopProgressBar();
  }
  createBars () {
    const bars = [];
    for (let i = 0; i <= this.props.size; i++) {
      bars.push({isActive: false});
    }
    this.setState({ bars });
  }
  startProgressBar () {
    this.updateInterval = setInterval(this.updateProgressBar.bind(this), 300);
  };
  updateProgressBar () {
    let index = this.state.index;
    let incrementer = this.state.incrementer;
    let bars = this.state.bars;
    // flip incrementer if necessary, to stay in bounds
    if ((index < 0) || (index > this.props.size)) {
      incrementer = incrementer * -1;
      index += incrementer;
    }
    // update the indexed bar
    if (incrementer > 0) {
      bars[index].isActive = true;
    } else {
      bars[index].isActive = false;
    };
    // increment index
    index += incrementer;
    // update state
    this.setState({
      bars,
      incrementer,
      index,
    });
  };
  stopProgressBar () {
    clearInterval(this.updateInterval);
  };
  render () {
    return (
      <div>
        {this.state.bars.map((bar, index) => bar.isActive ? <ActiveStatusBar key={index} /> : <InactiveStatusBar key={index}/>)}
      </div>
    );
  }
};

ProgressBar.propTypes = {
  size: PropTypes.number.isRequired,
};

export default ProgressBar;
