/**
 * 简单封装本地存储 供外部调用
 */

const store = window.localStorage;

class LocalStorage {
  /**
   * 设置数据，如果value是object 会调用JSON.stringify() 自动转换为字符串
   */
  public static set(key: string, value: any) {
    if (!store) return;
    let v = value; // 备份一份
    try {
      if (typeof value === 'object') {
        v = JSON.stringify(value);
      }
      store.setItem(key, v);
    } catch (error) {
      console.log(error);
    }
  }
  public static get2Json(key: string) {
    if (!store) return;
    const data = store.getItem(key) || '';
    try {
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
    return null;
  }
  public static get(key: string) {
    if (!store) return;
    const data = store.getItem(key) || '';
    return data;
  }
  public static remove(key: string) {
    if (!store) return;
    try {
      store.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }
}

export default LocalStorage;
