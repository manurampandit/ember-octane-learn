import Service from '@ember/service';
const USER_ID_KEY = 'slack-userid';
import { inject as service } from '@ember/service';
// import Router  from '@ember/routing';
import fetch from 'fetch';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AuthService extends Service {
  /**
   * @type '@ember/routing'.Router
   */
  @service router;
  _readUserId() {
    return localStorage.getItem(USER_ID_KEY);
  }
  _writeUserId(userId){
    localStorage.setItem(USER_ID_KEY, userId);
  }
// current User Id
  get currentUserId() {
    return this._readUserId();
  }

  @tracked
  user = null;

  // login with User id
  async loginWithUserId(userId) {
    // store the user id
    this._writeUserId(userId);
    //  fetch the user record
    await this.fetchUserRecord();
    // send the user to the "logged in" experience
    this.router.transitionTo('teams');
  }

  async fetchUserRecord() {
    // fetch the user's record
    const resp = await fetch(`/api/users/${this.currentUserId}`);
    this.user = await resp.json();
  }
  // logout
  @action
  async logout() {
    this._writeUserId(''); //because local storage does stringify
    this.userId = null;
    this.router.transitionTo('login');
  }
}
