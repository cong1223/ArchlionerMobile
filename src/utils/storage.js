import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  /**
   * 获取
   * @param key
   * @returns {Promise<T>|*|Promise.<TResult>}
   */

  static getItem(key) {
    return AsyncStorage.getItem(key).then(value => {
      const jsonValue = JSON.parse(value);
      return jsonValue;
    });
  }

  /**
   * 保存
   * @param key
   * @param value
   * @returns {*}
   */
  static setItem(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * 更新
   * @param key
   * @param value
   * @returns {Promise<T>|Promise.<TResult>}
   */
  static update(key, value) {
    return Storage.get(key).then(item => {
      value =
        typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }

  /**
   * 更新
   * @param key
   * @returns {*}
   */
  static delete(key) {
    return AsyncStorage.removeItem(key);
  }
}

export default Storage;
