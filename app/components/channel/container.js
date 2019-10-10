import Component from '@glimmer/component';
import {
  tracked
} from '@glimmer/tracking';
import fetch from 'fetch';
import { action } from '@ember/object';
export default class ChannelContainerComponent extends Component {
  constructor() {
    super(...arguments);
    // setTimeout(()=> this.loadMessages(), 2000);
  }
  @tracked
  messages = [];

  @action
  async loadMessages() {
    const {
      channel
    } = this.args; //catching all argument
    const {
      teamId,
      id: channelId
    } = channel;
    const resp = await fetch(`/api/teams/${teamId}/channels/${channelId}/messages`);
    this.messages = await resp.json();
  }

  @action
  async createMessage(body) {
    console.log('inside create message', body);
  }

  @action
  async deleteMessage(messageId) {
    console.log('Delete message', messageId);
  }
}
