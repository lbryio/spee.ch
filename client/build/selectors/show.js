"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectShowState = exports.selectAsset = void 0;

var selectAsset = function selectAsset(show) {
  var request = show.requestList[show.request.id];
  var assetKey = request.key;
  return show.assetList[assetKey];
};

exports.selectAsset = selectAsset;

var selectShowState = function selectShowState(state) {
  return state.show;
};

exports.selectShowState = selectShowState;