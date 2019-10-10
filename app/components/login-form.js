import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {inject as service} from '@ember/service';
import AuthService from 'shlack/services/auth';
export default class LoginFormComponent extends Component {
  performLogin(userId) {
    console.log('userId', userId);
    this.auth.loginWithUserId(userId);
  }
  /**
   * @type {AuthService}
   */
  @service auth;

  @tracked
  userId = null;

  get isDisabled() {
    return !this.userId;
  }

  @action
  handleSubmit(evt) {
    evt.preventDefault();
    // const selectedElem = evt.target.querySelector('select');
    // this.performLogin(selectedElem.value);
    this.performLogin(this.userId);
  }

  @action
  handleUserSelect(evt) {
    this.userId = evt.target.value;
  }
}
