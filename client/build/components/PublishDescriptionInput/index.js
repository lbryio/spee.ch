"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _PublishDetailsRow = _interopRequireDefault(require("@components/PublishDetailsRow"));

var _Label = _interopRequireDefault(require("@components/Label"));

var _ExpandingTextArea = _interopRequireDefault(require("@components/ExpandingTextArea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PublishDescriptionInput = function PublishDescriptionInput(_ref) {
  var description = _ref.description,
      handleInput = _ref.handleInput;
  return _react.default.createElement(_PublishDetailsRow.default, {
    label: _react.default.createElement(_Label.default, {
      value: 'Description:'
    }),
    content: _react.default.createElement(_ExpandingTextArea.default, {
      id: "publish-description",
      className: "textarea textarea--primary textarea--full-width",
      rows: 1,
      maxLength: 2000,
      style: {
        maxHeight: 200
      },
      name: "description",
      placeholder: "Optional description",
      value: description,
      onChange: handleInput
    })
  });
};

var _default = PublishDescriptionInput;
exports.default = _default;