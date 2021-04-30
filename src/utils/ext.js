function filterFieldData(courseData, field, doSlice) {
  const _data = courseData.filter((item, index) => {
    if (field === 'all') {
      return true;
    }
    return item.field === field;
  });
  return doSlice ? _data.slice(0, 4) : _data;
}

function directToPage(navigation, pageName, params) {
  return function () {
    navigation.navigate(pageName, params);
  };
}

export { filterFieldData, directToPage };
