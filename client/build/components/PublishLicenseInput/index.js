"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _RowLabeled = _interopRequireDefault(require("@components/RowLabeled"));

var _Label = _interopRequireDefault(require("@components/Label"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PublishLicenseInput = function PublishLicenseInput(_ref) {
  var handleSelect = _ref.handleSelect;
  return _react.default.createElement(_RowLabeled.default, {
    label: _react.default.createElement(_Label.default, {
      value: 'License:'
    }),
    content: _react.default.createElement("select", {
      type: "text",
      name: "license",
      id: "publish-license",
      className: "select select--primary",
      onChange: handleSelect
    }, _react.default.createElement("option", {
      value: " "
    }, "Unspecified"), _react.default.createElement("option", {
      value: "Public Domain"
    }, "Public Domain"), _react.default.createElement("option", {
      value: "Creative Commons"
    }, "Creative Commons"))
  });
};

var _default = PublishLicenseInput;
exports.default = _default;