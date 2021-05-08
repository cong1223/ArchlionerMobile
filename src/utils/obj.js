export function deleteEmptyProperty(obj) {
  const object = obj;
  for (const i in object) {
    const value = object[i];
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          delete object[i];
          continue;
        }
      }
      if (value === null) {
        delete object[i];
      }
      this.deleteEmptyProperty(value);
    } else {
      if (value === '' || value === null || value === undefined) {
        delete object[i];
      }
    }
  }
  return object;
}
export function merge(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    const source = arguments[i] || {};
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        const value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
}
