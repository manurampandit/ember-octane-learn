import AuthService from "shlack/services/auth";

export default class StubAuthService extends AuthService {

  __testingUserId = null;
  _readUserId() {
    return this.__testingUserId;
  }
  _writeUserId(userId) {
    this.__testingUserId = userId;
  }
}