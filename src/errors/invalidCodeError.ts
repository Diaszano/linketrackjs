/**
 * Erro lançado quando um código é considerado inválido.
 */
export class InvalidCodeError extends Error {
  /**
   * Construtor da classe InvalidCodeError.
   *
   * @param {string} message - Uma mensagem descritiva sobre o código inválido.
   */
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCodeError';
  }
}
