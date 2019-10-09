import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class LoginFormComponent extends Component {
  performLogin(userId) {
    console.log('userId', userId);
  }

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
