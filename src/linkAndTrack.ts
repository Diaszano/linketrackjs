import { AuthorizationError } from '@/errors/authorizationError';
import { Tracked, TrackedEvent } from '@/interface/tracked';
import {
  TrackedByLinkAndTrack,
  TrackedEventByLinkAndTrack,
} from '@/interface/trackedByLinkAndTrack';
import { request, RequestOptions } from 'https';
import { UnexpectedError } from '@/errors/unexpectedError';
import { InternalError } from '@/errors/internalError';
import { UserError } from '@/errors/userError';
import { RequestError } from '@/errors/requestError';
import { getDate } from '@/utils/date';

/**
 * Classe responsável por interagir com a API Link&Track.
 */
export class LinkAndTrack {
  /**
   * Expressão regular para validar códigos.
   */
  private readonly regexCode = /(?<Code>[a-z]{2}\d{9}[a-z]{2})/i;

  /**
   * Expressão regular para validar tokens.
   */
  private readonly regexToken = /(?<Token>[\da-z]{64})/i;

  /**
   * Nome de usuário associado à instância LinkAndTrack.
   */
  private readonly user: string;

  /**
   * Token de autenticação privado associado à instância LinkAndTrack.
   */
  readonly #token: string;

  /**
   * Cria uma instância de LinkAndTrack.
   *
   * @param {string} user - O nome de usuário para autenticação.
   * @param {string} token - O token de autenticação privado.
   * @throws {AuthorizationError} Se o nome de usuário ou token fornecidos
   * forem inválidos.
   */
  constructor(user: string, token: string) {
    this.user = user;
    this.#token = token;

    this.validateUser();
    this.validateToken();
  }

  /**
   * Rastreia uma encomenda utilizando o código fornecido.
   *
   * @param {string} code - O código de rastreio da encomenda.
   * @returns {Promise<Tracked>} Uma Promise que resolve para um objeto Tracked.
   */
  async track(code: string): Promise<Tracked> {
    if (!this.checkCode(code)) {
      return {
        code,
        service: '',
        host: '',
        quantity: 0,
        events: [],
        time: 0,
        lastEvent: new Date(),
      };
    }

    const tracked = await this.trackOrder(code);

    return this.convertTracked(tracked);
  }

  /**
   * Converte um objeto TrackedByLinkAndTrack para o formato Tracked.
   *
   * @param {TrackedByLinkAndTrack} tracked - O objeto a ser convertido.
   * @returns {Tracked} O objeto convertido no formato Tracked.
   * @private
   */
  private convertTracked(tracked: TrackedByLinkAndTrack): Tracked {
    const { codigo, servico, host, quantidade, eventos, time, ultimo } =
      tracked;

    return {
      code: codigo,
      service: servico,
      host,
      quantity: quantidade,
      events: eventos.map(this.convertEvent),
      time,
      lastEvent: ultimo ?? new Date(),
    };
  }

  /**
   * Converte um objeto TrackedEventByLinkAndTrack para o formato TrackedEvent.
   *
   * @param {TrackedEventByLinkAndTrack} event - O objeto a ser convertido.
   * @returns {TrackedEvent} O objeto convertido no formato TrackedEvent.
   * @private
   */
  private convertEvent(event: TrackedEventByLinkAndTrack): TrackedEvent {
    const { data, hora, local, status } = event;

    return {
      date: getDate(data, hora),
      location: local,
      status,
    };
  }

  /**
   * Rastreia uma encomenda na API do Link&Track utilizando o código fornecido.
   *
   * @param {string} code - O código de rastreio da encomenda.
   * @returns {Promise<TrackedByLinkAndTrack>} Uma Promise que resolve para um
   * objeto TrackedByLinkAndTrack.
   * @throws {RequestError} Se ocorrer um erro durante a requisição à API do
   * Link&Track.
   * @throws {InternalError} Se ocorrer um erro interno na API do Link&Track.
   * @throws {AuthorizationError} Se o usuário não tiver autorização para
   * acessar a API do Link&Track.
   * @throws {UserError} Se o usuário exceder a quantidade de rastreios
   * permitida por minuto.
   * @throws {UnexpectedError} Se ocorrer um erro inesperado durante o
   * processamento.
   * @private
   */
  private async trackOrder(code: string): Promise<TrackedByLinkAndTrack> {
    const requestOptions: RequestOptions = {
      hostname: 'api.linketrack.com',
      port: 443,
      path: `/track/json?user=${this.user}&token=${this.#token}&codigo=${code}`,
      method: 'GET',
    };

    try {
      return await new Promise<TrackedByLinkAndTrack>(
        (resolve, reject): void => {
          const req = request(requestOptions, (response) => {
            let data = '';

            response.on('data', (chunk): void => {
              data += chunk.toString();
            });

            response.on('end', () => {
              if (response.statusCode === 200) {
                const order = JSON.parse(data) as TrackedByLinkAndTrack;
                resolve(order);
              } else {
                reject(
                  new RequestError(
                    'Erro na requisição à API do Link&Track.',
                    response.statusCode ?? 0,
                  ),
                );
              }
            });
          });

          req.on('error', (error) => {
            reject(error);
          });

          req.end();
        },
      );
    } catch (error) {
      if (error instanceof RequestError) {
        switch (error.statusCode) {
          case 0:
            throw new InternalError(
              'Ocorreu um erro interno na API. Tente novamente mais tarde!',
            );
          case 403:
            throw new AuthorizationError(
              'Usuário sem autorização! Revise suas credenciais!',
            );
          case 429:
            throw new UserError(
              'Você excedeu a quantidade de rastreios permitida por minuto.',
            );
          case 500:
            throw new InternalError(
              'Ocorreu um erro interno na API. Tente novamente mais tarde!',
            );
        }
      }
      throw new UnexpectedError(`Erro inesperado: ${error}`);
    }
  }

  /**
   * Valida o nome de usuário.
   *
   * @throws {AuthorizationError} Se o nome de usuário for inválido.
   * @private
   */
  private validateUser(): void {
    if (!this.checkUser(this.user)) {
      throw new AuthorizationError(`Usuário inválido!`);
    }
  }

  /**
   * Valida o token de autenticação.
   *
   * @throws {AuthorizationError} Se o token for inválido.
   * @private
   */
  private validateToken(): void {
    if (!this.checkToken(this.#token)) {
      throw new AuthorizationError(`Token inválido!`);
    }
  }

  /**
   * Verifica se o token é válido.
   *
   * @param {string} token - O token a ser verificado.
   * @returns {boolean} Retorna true se o token for válido, caso contrário,
   * false.
   * @private
   */
  private checkToken(token: string): boolean {
    return this.regexToken.test(token);
  }

  /**
   * Verifica se o nome de usuário atende aos requisitos.
   *
   * @param {string} user - O nome de usuário a ser verificado.
   * @returns {boolean} Retorna true se o nome de usuário for válido, caso
   * contrário, false.
   * @private
   */
  private checkUser(user: string): boolean {
    return user.length >= 5;
  }

  /**
   * Verifica se o código atende aos requisitos.
   *
   * @param {string} code - O código a ser verificado.
   * @returns {boolean} Retorna true se o código for válido, caso contrário,
   * false.
   * @private
   */
  private checkCode(code: string): boolean {
    return this.regexCode.test(code);
  }
}
