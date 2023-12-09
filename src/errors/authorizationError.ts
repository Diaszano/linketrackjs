/**
 * Erro lançado quando ocorre uma falha na autorização.
 */
export class AuthorizationError extends Error {
  /**
   * Construtor da classe AuthorizationError.
   * @param {string} message - Uma mensagem descritiva sobre o erro de autorização.
   */
  constructor(message: string) {
    super(message);
    this.name = 'AuthorizationError';
  }
}
