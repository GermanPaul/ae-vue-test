export default class Session {
  static set(name, value) {
    sessionStorage[name] = value;
  }

  static get(name) {
    return sessionStorage[name];
  }

  static delete(name) {
    sessionStorage.removeItem(name);
  }
}
