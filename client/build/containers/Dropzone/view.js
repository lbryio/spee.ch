"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _file = require("../../utils/file");

var _PublishPreview = _interopRequireDefault(require("@components/PublishPreview"));

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

var Dropzone =
/*#__PURE__*/
function (_React$Component) {
  function Dropzone(props) {
    var _this;

    _classCallCheck(this, Dropzone);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropzone).call(this, props));
    _this.state = {
      dragOver: false,
      mouseOver: false,
      dimPreview: false
    };
    _this.handleDrop = _this.handleDrop.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDragOver = _this.handleDragOver.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDragEnd = _this.handleDragEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDragEnter = _this.handleDragEnter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleDragLeave = _this.handleDragLeave.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMouseEnter = _this.handleMouseEnter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleMouseLeave = _this.handleMouseLeave.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleFileInput = _this.handleFileInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.chooseFile = _this.chooseFile.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Dropzone, [{
    key: "handleDrop",
    value: function handleDrop(event) {
      event.preventDefault();
      this.setState({
        dragOver: false
      }); // if dropped items aren't files, reject them

      var dt = event.dataTransfer;

      if (dt.items) {
        if (dt.items[0].kind === 'file') {
          var droppedFile = dt.items[0].getAsFile();
          this.chooseFile(droppedFile);
        }
      }
    }
  }, {
    key: "handleDragOver",
    value: function handleDragOver(event) {
      event.preventDefault();
    }
  }, {
    key: "handleDragEnd",
    value: function handleDragEnd(event) {
      var dt = event.dataTransfer;

      if (dt.items) {
        for (var i = 0; i < dt.items.length; i++) {
          dt.items.remove(i);
        }
      } else {
        event.dataTransfer.clearData();
      }
    }
  }, {
    key: "handleDragEnter",
    value: function handleDragEnter() {
      this.setState({
        dragOver: true,
        dimPreview: true
      });
    }
  }, {
    key: "handleDragLeave",
    value: function handleDragLeave() {
      this.setState({
        dragOver: false,
        dimPreview: false
      });
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter() {
      this.setState({
        mouseOver: true,
        dimPreview: true
      });
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave() {
      this.setState({
        mouseOver: false,
        dimPreview: false
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      event.preventDefault();
      document.getElementById('file_input').click();
    }
  }, {
    key: "handleFileInput",
    value: function handleFileInput(event) {
      event.preventDefault();
      var fileList = event.target.files;
      this.chooseFile(fileList[0]);
    }
  }, {
    key: "chooseFile",
    value: function chooseFile(file) {
      if (file) {
        try {
          (0, _file.validateFile)(file); // validate the file's name, type, and size
        } catch (error) {
          return this.props.setFileError(error.message);
        } // stage it so it will be ready when the publish button is clicked


        this.props.selectFile(file);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "row row--tall flex-container--column"
      }, _react.default.createElement("form", null, _react.default.createElement("input", {
        className: "input-file",
        type: "file",
        id: "file_input",
        name: "file_input",
        accept: "video/*,image/*",
        onChange: this.handleFileInput,
        encType: "multipart/form-data"
      })), _react.default.createElement("div", {
        id: "preview-dropzone",
        className: 'row row--padded row--tall dropzone' + (this.state.dragOver ? ' dropzone--drag-over' : ''),
        onDrop: this.handleDrop,
        onDragOver: this.handleDragOver,
        onDragEnd: this.handleDragEnd,
        onDragEnter: this.handleDragEnter,
        onDragLeave: this.handleDragLeave,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        onClick: this.handleClick
      }, this.props.file ? _react.default.createElement("div", null, _react.default.createElement(_PublishPreview.default, {
        dimPreview: this.state.dimPreview,
        file: this.props.file,
        thumbnail: this.props.thumbnail
      }), _react.default.createElement("div", {
        id: "dropzone-text-holder",
        className: 'flex-container--column flex-container--center-center'
      }, this.state.dragOver ? _react.default.createElement("div", {
        id: "dropzone-dragover"
      }, _react.default.createElement("p", {
        className: "blue"
      }, "Drop it.")) : null, this.state.mouseOver ? _react.default.createElement("div", {
        id: "dropzone-instructions"
      }, _react.default.createElement("p", {
        className: "info-message-placeholder info-message--failure",
        id: "input-error-file-selection"
      }, this.props.fileError), _react.default.createElement("p", null, "Drag & drop image or video here to publish"), _react.default.createElement("p", {
        className: "fine-print"
      }, "OR"), _react.default.createElement("p", {
        className: "blue--underlined"
      }, "CHOOSE FILE")) : null)) : _react.default.createElement("div", {
        id: "dropzone-text-holder",
        className: 'flex-container--column flex-container--center-center'
      }, this.state.dragOver ? _react.default.createElement("div", {
        id: "dropzone-dragover"
      }, _react.default.createElement("p", {
        className: "blue"
      }, "Drop it.")) : _react.default.createElement("div", {
        id: "dropzone-instructions"
      }, _react.default.createElement("p", {
        className: "info-message-placeholder info-message--failure",
        id: "input-error-file-selection"
      }, this.props.fileError), _react.default.createElement("p", null, "Drag & drop image or video here to publish"), _react.default.createElement("p", {
        className: "fine-print"
      }, "OR"), _react.default.createElement("p", {
        className: "blue--underlined"
      }, "CHOOSE FILE")))));
    }
  }]);

  _inherits(Dropzone, _React$Component);

  return Dropzone;
}(_react.default.Component);

;
var _default = Dropzone;
exports.default = _default;