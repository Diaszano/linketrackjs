import { AuthorizationError } from '@/errors/authorizationError';

/**
 * Classe responsável por interagir com a API Link&Track.
 */
export class LinkAndTrack {
  /**
   * Expressão regular para validar códigos.
   */
  private readonly regexCode = new RegExp(/(?<Code>[a-z]{2}\d{9}[a-z]{2})/i);

  /**
   * Expressão regular para validar tokens.
   */
  private readonly regexToken = new RegExp(/(?<Token>[\da-z]{64})/i);

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
