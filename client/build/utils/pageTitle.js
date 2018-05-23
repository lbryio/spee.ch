"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPageTitle = void 0;

var createPageTitle = function createPageTitle(siteTitle, pageTitle) {
  if (!pageTitle) {
    return "".concat(siteTitle);
  }

  return "".concat(siteTitle, " - ").concat(pageTitle);
};

exports.createPageTitle = createPageTitle;