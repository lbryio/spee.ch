"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _RowLabeled = _interopRequireDefault(require("@components/RowLabeled"));

var _Label = _interopRequireDefault(require("@components/Label"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PublishNsfwInput = function PublishNsfwInput(_ref) {
  var nsfw = _ref.nsfw,
      handleInput = _ref.handleInput;
  return _react.default.createElement(_RowLabeled.default, {
    label: _react.default.createElement(_Label.default, {
      value: 'Mature:'
    }),
    content: _react.default.createElement("input", {
      className: "input-checkbox",
      type: "checkbox",
      id: "publish-nsfw",
      name: "nsfw",
      value: nsfw,
      onChange: handleInput
    })
  });
};

var _default = PublishNsfwInput;
exports.default = _default;