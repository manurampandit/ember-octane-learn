import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ChannelFooterComponent extends Component {
  @action
  async handleSubmit(evt) {
    evt.preventDefault();
    const input = evt.target.querySelector('input');
    const {value} = input;
    await this.args.create(value);
    input.value = '';
  }
}
