import axios, { AxiosError } from 'axios';
import LinketrackResponse from './interface/LinketrackResponse';
import LinketrackError from './interface/LinketrackError';

export default class linketrack {
  constructor(private readonly user: string, private readonly token: string) {}

  async track(code: string): Promise<LinketrackResponse> {
    return this.request(code);
  }

  async trackAll(...codes: Array<string>): Promise<Array<LinketrackResponse>> {
    const array_track = new Array<LinketrackResponse>();
    for (const code of codes) {
      array_track.push(await this.request(code));
    }
    return array_track;
  }

  private async request(code: string): Promise<LinketrackResponse> {
    try {
      const response = await axios.get(this.url(code));
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === 'ERR_BAD_REQUEST') {
          if (error.response?.statusText === 'Unauthorized') {
            throw new LinketrackError('Usuário não autorizado.');
          }
          if (error.response?.statusText === 'Too Many Requests') {
            throw new LinketrackError(
              'Muitas solicitações estão sendo feitas.',
            );
          }
        }
      }
      console.error(error);
      throw new LinketrackError((error as Error).message);
    }
  }

  private url(code: string): string {
    const url_base = 'https://api.linketrack.com/track/json';
    return `${url_base}?user=${this.user}&token=${this.token}&codigo=${code}`;
  }
}
