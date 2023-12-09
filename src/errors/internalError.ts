/**
 * Erro lançado quando ocorre um erro interno.
 */
export class InternalError extends Error {
  /**
   * Construtor da classe InternalError.
   *
   * @param {string} message - Uma mensagem descritiva sobre o erro.
   */
  constructor(message: string) {
    super(message);
    this.name = 'InternalError';
  }
}
