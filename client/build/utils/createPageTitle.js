"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _siteConfig = _interopRequireDefault(require("@config/siteConfig.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var siteTitle = _siteConfig.default.details.title;

var createPageTitle = function createPageTitle(pageTitle) {
  if (!pageTitle) {
    return "".concat(siteTitle);
  }

  return "".concat(siteTitle, " - ").concat(pageTitle);
};

var _default = createPageTitle;
exports.default = _default;