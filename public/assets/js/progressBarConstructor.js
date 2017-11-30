const ProgressBar = function() {
    this.state = {
        x: 0,
        adder: 1,
        bars: [],
    };
    this.setState = function (key, value) {
        this.state[key] = value;
    };
    this.barHolder = document.getElementById('bar-holder');
    this.createProgressBar = function (size) {
        this.setState('size', size);
        for (var i = 0; i < size; i++) {
            const bar = document.createElement('span');
            bar.innerText = '| ';
            bar.setAttribute('class', 'progress-bar progress-bar--inactive');
            this.barHolder.appendChild(bar);
            this.state.bars.push(bar);
        }
    };
    this.startProgressBar = function () {
        this.updateInterval = setInterval(this.updateProgressBar.bind(this), 300);
    };
    this.updateProgressBar = function () {
        const x = this.state.x;
        const adder = this.state.adder;
        const size = this.state.size;
        // update the appropriate bar
        if (x > -1 && x < size){
            if (adder === 1){
                this.state.bars[x].setAttribute('class', 'progress-bar progress-bar--active');
            } else {
                this.state.bars[x].setAttribute('class', 'progress-bar progress-bar--inactive');
            }
        }
        // update adder
        if (x === size){
            this.setState('adder', -1);
        } else if ( x === -1){
            this.setState('adder', 1);
        }
        // update x
        this.setState('x', x + adder);
    };
    this.stopProgressBar = function () {
        clearInterval(this.updateInterval);
    };
};