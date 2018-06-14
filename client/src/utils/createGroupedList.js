export const createGroupedList = (list, size) => {
  if (!size) {
    throw new Error('no size provided to createGroupedList');
  }

  if (!list) {
    throw new Error('no list provided to createGroupedList');
  }
  let groupedList = [];
  for (let i = 0; i < list.length; i = i + size) {
    let group = [];
    for (let j = i; j < (i + size); j++) {
      group.push(list[j]);
    }
    groupedList.push(group);
  }
  return groupedList;
};
