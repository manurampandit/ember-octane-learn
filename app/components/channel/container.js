import Component from '@glimmer/component';
import {
  tracked
} from '@glimmer/tracking';
import fetch from 'fetch';
import {
  action
} from '@ember/object';
import {
  inject as service
} from '@ember/service';
/**
 * POST http://localhost:4200/api/messages HTTP/1.1
Content-Type: application/json

{
  "teamId": "li",
  "channelId": "general",
  "userId": 1,
  "body": "Hi everyone!"
}
 */
export default class ChannelContainerComponent extends Component {
  @service auth;
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
    const {channel} = this.args;
    const {teamId, id: channelId} = channel;
    console.log('inside create message', body);
    const resp = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body,
        teamId,
        channelId,
        userId: this.auth.currentUserId,
      })
    });
    const newMessage = await resp.json();
    // if this component is still there
    if (this.isDestroying) return;

    const newRecord = {...newMessage, user: this.auth.user};

    //option 1
    // this.messages.push({newRecord});
    // this.messages = this.messages;

    //option 2
    this.messages = [...this.messages, newRecord];
  }

  @action
  async deleteMessage(messageId) {
    console.log('Delete message', messageId);
    const resp = await fetch(`/api/messages/${messageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!resp.ok) throw new Error('Trouble deleting messages');
    if (this.isDestroying) return;
    this.messages = this.messages.filter(m => m.id !== messageId);
  }
}
