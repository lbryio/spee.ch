import React from 'react';

function ActiveBar () {
  return <span className="progress-bar progress-bar--active">| </span>;
}

function InactiveBar () {
  return <span className="progress-bar progress-bar--inactive">| </span>;
}

class ProgressBar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      size       : 12,
      bars       : [],
      index      : 0,
      incrementer: 1,
    };
    this.startProgressBar = this.startProgressBar.bind(this);
    this.updateProgressBar = this.updateProgressBar.bind(this);
    this.stopProgressBar = this.stopProgressBar.bind(this);
  }
  componentWillMount () {
    const bars = [];
    for (let i = 0; i <= this.state.size; i++) {
      bars.push(<InactiveBar key={i} />);
    }
    this.setState({ bars });
  }
  componentWillUnmount () {
    this.stopProgressBar();
  }
  componentDidMount () {
    this.startProgressBar();
  }
  startProgressBar () {
    this.updateInterval = setInterval(this.updateProgressBar.bind(this), 300);
  };
  updateProgressBar () {
    let index = this.state.index;
    let incrementer = this.state.incrementer;
    let bars = this.state.bars;
    // flip incrementer if necessary, to stay in bounds
    if ((index < 0) || (index > this.state.size)) {
      incrementer = incrementer * -1;
      index += incrementer;
    }
    // update the indexed value
    if (incrementer > 0) {
      bars[index] = <ActiveBar key={index} />;
    } else {
      bars[index] = <InactiveBar key={index} />;
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
        {this.state.bars}
      </div>
    );
  }
};

export default ProgressBar;
