"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGroupedList = void 0;

var createGroupedList = function createGroupedList(list, size) {
  if (!size) {
    throw new Error('no size provided to createGroupedList');
  }

  if (!list) {
    throw new Error('no list provided to createGroupedList');
  }

  var groupedList = [];

  for (var i = 0; i < list.length; i = i + size) {
    var group = [];

    for (var j = i; j < i + size; j++) {
      group.push(list[j]);
    }

    groupedList.push(group);
  }

  return groupedList;
};

exports.createGroupedList = createGroupedList;