import axios, { AxiosError } from 'axios';
import LinketrackResponse from './interface/LinketrackResponse';
import LinketrackError from './errors/LinketrackError';

export default class linketrack {
  constructor(private readonly user: string, private readonly token: string) {}

  /**
   * Realiza o rastreamento de um código fornecido.
   * @param {string} code - O código de rastreio fornecido pelos Correios.
   * @returns {Promise<LinketrackResponse>} Uma Promise que contém a resposta do rastreamento.
   */
  async track(code: string): Promise<LinketrackResponse> {
    return this.request(code);
  }

  /**
   * Realiza o rastreamento de vários códigos fornecidos utilizando.
   * @param {...Array<string>} codes - Uma lista de códigos de rastreio fornecido pelos Correios.
   * @returns {Promise<Array<LinketrackResponse>>} Uma Promise que contém um array com as respostas do rastreamento de cada código.
   */
  async trackAll(...codes: Array<string>): Promise<Array<LinketrackResponse>> {
    const array_track = new Array<LinketrackResponse>();
    for (const code of codes) {
      array_track.push(await this.request(code));
    }
    return array_track;
  }

  /**
   * Realiza uma requisição à API do LINK & TRACK para obter o rastreamento de um código.
   * @param {string} code - O código de rastreio fornecido pelos Correios.
   * @returns {Promise<LinketrackResponse>} Uma Promise que contém a resposta do rastreamento.
   * @throws {LinketrackError} Lança um erro personalizado caso ocorra um erro durante a requisição.
   */
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

  /**
   * Gera uma URL que podemos fazer a requisição a API do LINK & TRACK.
   * @param {string} code - O código de rastreio fornecido pelos Correios.
   * @returns {string} Retorna a URL para fazer a requisição na API do LINK & TRACK.
   */
  private url(code: string): string {
    const url_base = 'https://api.linketrack.com/track/json';
    return `${url_base}?user=${this.user}&token=${this.token}&codigo=${code}`;
  }
}
