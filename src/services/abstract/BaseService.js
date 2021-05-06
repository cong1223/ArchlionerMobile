import { BASE_URL } from '../../config/uri';
import Storage from '../../utils/storage';
import keys from '../../config/keys';
export default class BaseService {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  output(promise, isTotal = false) {
    return new Promise((resolve, reject) => {
      promise.then(
        resp => {
          if (!resp) {
            reject();
          } else {
            if (resp.success) {
              if (resp.code === 200) {
                resp = resp.result;
                if (isTotal) {
                  resolve(resp);
                } else {
                  resolve((resp && resp.list) || (resp && resp.data) || resp);
                }
              } else {
                reject(resp);
              }
            } else {
              reject(resp);
            }
          }
        },
        resp => {
          reject(resp);
        }
      );
    });
  }

  outputWithMessage(promise) {
    return new Promise((resolve, reject) => {
      promise.then(
        resp => {
          if (!resp) {
            reject();
          } else {
            if (resp.success) {
              if (resp.code === 200) {
                resolve(resp);
              } else {
                reject(resp);
              }
            } else {
              reject(resp);
            }
          }
        },
        resp => {
          reject(resp);
        }
      );
    });
  }

  /** * GET 请求 */
  get(url, params) {
    if (params) {
      let paramsArray = [];
      //拼接参数
      Object.keys(params).forEach(key =>
        paramsArray.push(key + '=' + params[key])
      );
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&');
      } else {
        url += '&' + paramsArray.join('&');
      }
    }

    return new Promise(async (resolve, reject) => {
      fetch(url, {
        headers: {
          'x-user-agent': 'web',
          'x-ent': await Storage.getItem(keys.ENTERPRISE_ID),
          'x-access-token': await Storage.getItem(keys.X_ACCESS_TOKEN)
        }
      })
        .then(response => response.json())
        //把response转为json
        .then(responseJson => {
          resolve(responseJson);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
  /** * POST 请求，经测试用FormData传递数据也可以 */
  post(url, params) {
    return new Promise(async (resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          //媒体格式类型key/value格式
          // 'Accept': 'application/json;charset=UTF-8',
          // 'Content-Type': 'multipart/form-data'
          'Content-Type': 'application/json',
          'x-user-agent': 'web',
          'x-ent': await Storage.getItem(keys.ENTERPRISE_ID),
          'x-access-token': await Storage.getItem(keys.X_ACCESS_TOKEN)
        },
        body: JSON.stringify(params)
      })
        .then(response => response.json())
        //把response转为json
        .then(responseJson => {
          resolve(responseJson);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  /** * POST 请求，经测试用FormData传递数据也可以 Json格式 */
  postJson(url, params, success, fail, error) {
    console.log(url, params);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        //媒体格式类型key/value格式
        // 'Accept': 'application/json;charset=UTF-8',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      //把response转为json
      .then(responseJson => {
        // 拿到上面的转好的json
        console.log(responseJson);
        // 打印返回结果
        if (responseJson.status == 0) {
          // 0为请求成功
          success && success(responseJson.entity);
        } else {
          fail && fail(responseJson.entity);
          //可以处理返回的错误信息
        }
      })
      .catch(e => {
        console.log(e);
        error && error(error);
        // Alert.alert('错误提示', '请检查您的网络是否已经连接');
      });
  }

  /** * @images uri数组 * @param FormData格式,没有参数的话传null */
  static uploadFile(url, images, params, success, fail, error) {
    console.log(url, images);
    let formData = new FormData();
    if (params) {
      formData = params;
    }
    for (var i = 0; i < images.length; i++) {
      var uri = images[i];
      var date = new Date();
      var name = date.getTime() + '.png';
      //用时间戳保证名字的唯一性
      let file = { uri: uri, type: 'multipart/form-data', name: name };
      formData.append('file', file);
    }
    console.log(url, formData);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        //媒体格式类型key/value格式
        'Content-Type': 'multipart/form-data'
        // customerId: customerId,
        // appId: appId
      },
      body: formData
    })
      .then(response => response.json())
      //把response转为json
      .then(responseJson => {
        // 拿到上面的转好的json
        console.log(responseJson);
        // 打印返回结果
        if (responseJson.status == 0) {
          // 0为请求成功
          success && success(responseJson.data);
        } else {
          fail && fail();
          //可以处理返回的错误信息
        }
      })
      .catch(e => {
        console.log(e);
        error && error(error);
      });
  }
}
