/**
 * 枚举常量基础类
 * @Author 王聪
 * @cdate 2018-01-20 14:35
 */
export default class BaseConstant {
  constructor(name, value, cname, desc) {
    this._name = name;
    this._value = value;
    this._cname = cname;
    this._desc = desc;
  }

  name() {
    return this._name;
  }

  cname() {
    return this._cname;
  }

  value() {
    return this._value;
  }

  numberValue() {
    return parseInt(this.value())
  }

  desc() {
    return this._desc;
  }

  /**
   * 获得所有常量的map
   * @returns {{}}
   */
  static getEnumMap() {
    let prototypeMap = Object.getOwnPropertyDescriptors(this);
    let enumMap = {};
    for (let prototypeName in prototypeMap) {
      let val = prototypeMap[prototypeName].value;
      if ((val instanceof BaseConstant) && val._name) {
        enumMap[val._name] = val;
      }
    }
    return enumMap;
  }

  /**
   * 获得所有常量的数组
   * @returns {Array}
   */
  static getEnumList() {
    let prototypeMap = Object.getOwnPropertyDescriptors(this);
    let enumList = [];
    for (let prototypeName in prototypeMap) {
      let val = prototypeMap[prototypeName].value;
      if ((val instanceof BaseConstant) && val._name) {
        enumList.push(val);
      }
    }
    return enumList;
  }

  /**
   * 获取常量列表
   * @param option: 配置key和value的键名
   * @returns {[]}
   */
  static getCnameAndValueList(option) {
    const prototypeMap = Object.getOwnPropertyDescriptors(this);
    const enumList = [];
    for (const prototypeName in prototypeMap) {
      const val = prototypeMap[prototypeName].value;
      if ((val instanceof BaseConstant) && val._cname) {
        const eItem = {};
        eItem[(option && option.key) ? option.key : 'name'] = val._cname;
        eItem[(option && option.value) ? option.value : 'value'] = val._value;
        enumList.push(eItem);
      }
    }
    return enumList;
  }

  static getNameAndValueList(option) {
    const prototypeMap = Object.getOwnPropertyDescriptors(this);
    const enumList = [];
    for (const prototypeName in prototypeMap) {
      const val = prototypeMap[prototypeName].value;
      if ((val instanceof BaseConstant) && val._cname) {
        const eItem = {};
        eItem[(option && option.key) ? option.key : 'name'] = val._name;
        eItem[(option && option.value) ? option.value : 'value'] = val._value;
        enumList.push(eItem);
      }
    }
    return enumList;
  }

  static getValueByName(name) {
    let enumMap = this.getEnumMap();
    let _enum = enumMap[name];
    return _enum ? _enum.value() : null;
  }

  static getNameByValue(value) {
    let enumList = this.getEnumList();
    let name = null;
    enumList.find((_enum) => {
      if (_enum.value() == value) {
        name = _enum.name();
        return true;
      }
    });
    return name;
  }

  static getCnameByName(name) {
    let enumMap = this.getEnumMap();
    let _enum = enumMap[name];
    return _enum ? _enum.cname() : null;
  }

  static getCnameByValue(value) {
    let enumList = this.getEnumList();
    let cname = null;
    enumList.find((_enum) => {
      if (_enum.value() == value) {
        cname = _enum.cname();
        return true;
      }
    });
    return cname;
  }

  static getDescByValue(value) {
    let enumList = this.getEnumList();
    let desc = null;
    enumList.find((_enum) => {
      if (_enum.value() == value) {
        desc = _enum.desc();
        return true;
      }
    });
    return desc;
  }

  static getCnameByBitValue(value) {
    let enumList = this.getEnumList();
    let cnameArr = [];
    enumList.forEach((_enum) => {
      if ((value & _enum.value()) !== 0) {
        cnameArr.push(_enum.cname());
      }
    });
    return cnameArr.join(',');
  }

  /**
   * 给饿了么的select组件用
   * name为组件的value
   * cname为组件的label
   * @returns {*}
   */
  static getSelectOptionsByCnameAndName() {
    let enumList = this.getEnumList();
    let options = [];
    enumList.forEach((_enum) => {
      options.push({
        value: _enum.name(),
        label: _enum.cname()
      });
    });
    return options;
  }

  static getSelectOptionsByCnameAndNameWithAll(option = {label: '全部', value: ''}) {
    let options = this.getSelectOptionsByCnameAndName()
    option = !option ? {label: '全部', value: ''} : option
    options.unshift(option)
    return options;
  }

  /**
   * 给饿了么的select组件用
   * value为组件的value
   * cname为组件的label
   * @returns {*}
   */
  static getSelectOptionsByCnameAndValue() {
    let enumList = this.getEnumList();
    let options = [];
    enumList.forEach((_enum) => {
      options.push({
        value: _enum.value(),
        label: _enum.cname()
      });
    });
    return options;
  }

  static getSelectOptionsByCnameAndValueWithAll(option = {label: '全部', value: ''}) {
    let options = this.getSelectOptionsByCnameAndValue()
    option = !option ? {label: '全部', value: ''} : option
    options.unshift(option)
    return options;
  }

  /**
   * 查询按位与的位数的值是否在值内
   * @param value
   * @return boolean
   */
  isAttrIn(value) {
    if (null == value) {
      return false;
    }
    value = parseInt(value)
    return (value & this.numberValue()) == this.numberValue();
  }

  /**
   * 原属性中添加属性
   * @param attr
   * @return
   */
  addAttr(attr) {
    return this.numberValue() | (!attr ? 0 : attr);
  }

  /**
   * 原属性中去掉属性
   * @param attr
   * @return
   */
  removeAttr(attr) {
    if(!attr || attr <= 0){
      //logger.debug("原属性值 attribute="+attr+",不需要remove");
      return 0;
    }
    return ~this.numberValue() & attr;
  }

  /**
   * 获取属性位置，相当于log2 + 1
   * @return
   */
  getAttrPos() {
    return Math.log(this.numberValue()) / Math.log(2) + 1;
  }
}
