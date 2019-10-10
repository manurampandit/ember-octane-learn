import AuthService from "shlack/services/auth";

export default class StubAuthService extends AuthService {

  testingUserId = null;
  _readUserId() {
    return this.testingUserId;
  }
  _writeUserId(userId) {
    this.testingUserId = userId;
  }
}