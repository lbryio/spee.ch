"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGroupedList = void 0;

var createGroupedList = function createGroupedList(list, size) {
  var groupedList = [];

  while (list.length > 0) {
    groupedList.push(list.splice(0, size));
  }

  return groupedList;
};

exports.createGroupedList = createGroupedList;