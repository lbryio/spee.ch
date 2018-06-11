"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _FormFeedbackDisplay = _interopRequireDefault(require("@components/FormFeedbackDisplay"));

var _SpaceBetween = _interopRequireDefault(require("@components/SpaceBetween"));

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

function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString = atob(dataURI.split(',')[1]); // separate out the mime component

  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // write the bytes of the string to a typed array

  var ia = new Uint8Array(byteString.length);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {
    type: mimeString
  });
}

var PublishThumbnailInput =
/*#__PURE__*/
function (_React$Component) {
  function PublishThumbnailInput(props) {
    var _this;

    _classCallCheck(this, PublishThumbnailInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PublishThumbnailInput).call(this, props));
    _this.state = {
      videoSource: null,
      error: null,
      sliderMinRange: 1,
      sliderMaxRange: null,
      sliderValue: null
    };
    _this.handleVideoLoadedData = _this.handleVideoLoadedData.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSliderChange = _this.handleSliderChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.createThumbnail = _this.createThumbnail.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(PublishThumbnailInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var file = this.props.file;
      this.setVideoSource(file);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      // if file changes
      if (nextProps.file && nextProps.file !== this.props.file) {
        var file = nextProps.file;
        this.setVideoSource(file);
      }

      ;
    }
  }, {
    key: "setVideoSource",
    value: function setVideoSource(file) {
      var _this2 = this;

      var previewReader = new FileReader();
      previewReader.readAsDataURL(file);

      previewReader.onloadend = function () {
        var dataUri = previewReader.result;
        var blob = dataURItoBlob(dataUri);
        var videoSource = URL.createObjectURL(blob);

        _this2.setState({
          videoSource: videoSource
        });
      };
    }
  }, {
    key: "handleVideoLoadedData",
    value: function handleVideoLoadedData(event) {
      var duration = event.target.duration;
      var totalMinutes = Math.floor(duration / 60);
      var totalSeconds = Math.floor(duration % 60); // set the slider

      this.setState({
        sliderMaxRange: duration * 100,
        sliderValue: duration * 100 / 2,
        totalMinutes: totalMinutes,
        totalSeconds: totalSeconds
      }); // update the current time of the video

      var video = document.getElementById('video-thumb-player');
      video.currentTime = duration / 2;
    }
  }, {
    key: "handleSliderChange",
    value: function handleSliderChange(event) {
      var value = parseInt(event.target.value); // update the slider value

      this.setState({
        sliderValue: value
      }); // update the current time of the video

      var video = document.getElementById('video-thumb-player');
      video.currentTime = value / 100;
    }
  }, {
    key: "createThumbnail",
    value: function createThumbnail() {
      // take a snapshot
      var video = document.getElementById('video-thumb-player');
      var canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      var dataUrl = canvas.toDataURL();
      var blob = dataURItoBlob(dataUrl);
      var snapshot = new File([blob], "thumbnail.png", {
        type: 'image/png'
      }); // set the thumbnail in redux store

      if (snapshot) {
        this.props.onNewThumbnail(snapshot);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          error = _this$state.error,
          videoSource = _this$state.videoSource,
          sliderMinRange = _this$state.sliderMinRange,
          sliderMaxRange = _this$state.sliderMaxRange,
          sliderValue = _this$state.sliderValue,
          totalMinutes = _this$state.totalMinutes,
          totalSeconds = _this$state.totalSeconds;
      return _react.default.createElement("div", null, _react.default.createElement("label", {
        className: "label"
      }, "Thumbnail:"), _react.default.createElement("video", {
        id: "video-thumb-player",
        preload: "metadata",
        muted: true,
        style: {
          display: 'none'
        },
        playsInline: true,
        onLoadedData: this.handleVideoLoadedData,
        src: videoSource,
        onSeeked: this.createThumbnail
      }), sliderValue ? _react.default.createElement("div", null, _react.default.createElement(_SpaceBetween.default, {
        style: {
          width: '100%'
        }
      }, _react.default.createElement("span", {
        className: "text--small text--secondary"
      }, "0'00\""), _react.default.createElement("span", {
        className: "text--small text--secondary"
      }, totalMinutes, "'", totalSeconds, "\"")), _react.default.createElement("div", null, _react.default.createElement("input", {
        type: "range",
        min: sliderMinRange,
        max: sliderMaxRange,
        value: sliderValue,
        className: "input-slider",
        onChange: this.handleSliderChange
      }))) : _react.default.createElement("p", {
        className: 'text--small text--secondary'
      }, "loading... "), _react.default.createElement(_FormFeedbackDisplay.default, {
        errorMessage: error,
        defaultMessage: 'Use slider to set thumbnail'
      }));
    }
  }]);

  _inherits(PublishThumbnailInput, _React$Component);

  return PublishThumbnailInput;
}(_react.default.Component);

var _default = PublishThumbnailInput;
exports.default = _default;