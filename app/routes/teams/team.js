import Route from '@ember/routing/route';
import fetch from 'fetch';

export default class TeamsTeamRoute extends Route {
  async model(params) {
    const resp = await fetch(`/api/teams/${params.teamId}`);
    return await resp.json();
  }
}
