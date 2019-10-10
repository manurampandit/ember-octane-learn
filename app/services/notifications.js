import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import {inject as service} from '@ember/service';
import { action } from '@ember/object';

let nextId = 1;

function getId() {
  nextId++;
}

export default class NotificationsService extends Service {
  @tracked
  toasts = [{
    body: 'hello',
    color: 'indigo-darker'
  },
  {
    body: 'Hello me',
    color: 'indigo-darker'
  }
];



  /**
   * {body: 'hello', color: 'indigo-darker'}
   */

   @action
   notify(toast) {
    const myToast = {...toast, id: getId()};
    this.toasts = [...this.toasts, myToast];
    setTimeout(()=> {
      this.toasts = this.toasts.filter(t=> t.id !==myToast.id);
    }, 3000)

   }

}
