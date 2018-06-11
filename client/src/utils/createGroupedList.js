export const createGroupedList = (list, size) => {
  let groupedList = [];
  while (list.length > 0) {
    groupedList.push(list.splice(0, size));
  }
  return groupedList;
};
