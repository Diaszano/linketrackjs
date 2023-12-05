/**
 * Erro lançado quando o usuário comete alguma falha.
 */
export class UserError extends Error {
  /**
   * Construtor da classe UserError.
   *
   * @param {string} message - Uma mensagem descritiva sobre o erro do usuário.
   */
  constructor(message: string) {
    super(message);
    this.name = 'UserError';
  }
}
