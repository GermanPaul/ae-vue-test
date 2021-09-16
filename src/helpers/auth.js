import Session from './session';

const tokenName = 'aetoken';

export default class Auther {
  static isAuth() {
    return !(typeof Session.get(tokenName) === 'undefined');
  }

  static getToken() {
    return Session.get(tokenName);
  }

  static setToken(token) {
    Session.set(tokenName, token);
  }

  static removeToken() {
    Session.delete(tokenName);
  }
}
