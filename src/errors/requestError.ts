/**
 * Erro lançado quando uma requisição falha.
 */
export class RequestError extends Error {
  /**
   * Código de status HTTP associado ao erro de requisição.
   */
  readonly statusCode: number;

  /**
   * Construtor da classe RequestError.
   *
   * @param {string} message - Uma mensagem descritiva sobre o erro de
   * requisição.
   * @param {number} statusCode - O código de status HTTP associado à falha da
   * requisição.
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'RequestError';
    this.statusCode = statusCode;
  }
}
