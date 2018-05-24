"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ActiveStatusBar = _interopRequireDefault(require("../ActiveStatusBar"));

var _InactiveStatusBar = _interopRequireDefault(require("../InactiveStatusBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var ProgressBar =
/*#__PURE__*/
function (_React$Component) {
  function ProgressBar(props) {
    var _this;

    _classCallCheck(this, ProgressBar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProgressBar).call(this, props));
    _this.state = {
      bars: [],
      index: 0,
      incrementer: 1
    };
    _this.createBars = _this.createBars.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.startProgressBar = _this.startProgressBar.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.updateProgressBar = _this.updateProgressBar.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.stopProgressBar = _this.stopProgressBar.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ProgressBar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.createBars();
      this.startProgressBar();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopProgressBar();
    }
  }, {
    key: "createBars",
    value: function createBars() {
      var bars = [];

      for (var i = 0; i <= this.props.size; i++) {
        bars.push({
          isActive: false
        });
      }

      this.setState({
        bars: bars
      });
    }
  }, {
    key: "startProgressBar",
    value: function startProgressBar() {
      this.updateInterval = setInterval(this.updateProgressBar.bind(this), 300);
    }
  }, {
    key: "updateProgressBar",
    value: function updateProgressBar() {
      var index = this.state.index;
      var incrementer = this.state.incrementer;
      var bars = this.state.bars; // flip incrementer if necessary, to stay in bounds

      if (index < 0 || index > this.props.size) {
        incrementer = incrementer * -1;
        index += incrementer;
      } // update the indexed bar


      if (incrementer > 0) {
        bars[index].isActive = true;
      } else {
        bars[index].isActive = false;
      }

      ; // increment index

      index += incrementer; // update state

      this.setState({
        bars: bars,
        incrementer: incrementer,
        index: index
      });
    }
  }, {
    key: "stopProgressBar",
    value: function stopProgressBar() {
      clearInterval(this.updateInterval);
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, this.state.bars.map(function (bar, index) {
        return bar.isActive ? _react.default.createElement(_ActiveStatusBar.default, {
          key: index
        }) : _react.default.createElement(_InactiveStatusBar.default, {
          key: index
        });
      }));
    }
  }]);

  _inherits(ProgressBar, _React$Component);

  return ProgressBar;
}(_react.default.Component);

;
ProgressBar.propTypes = {
  size: _propTypes.default.number.isRequired
};
var _default = ProgressBar;
exports.default = _default;