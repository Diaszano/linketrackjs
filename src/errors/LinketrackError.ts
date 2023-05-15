/**
 * Classe de erro personalizada para erros relacionados à linketrackjs.
 */
export default class LinketrackError extends Error {
  /**
   * Construtor da classe LinketrackError.
   * @param {string} message - Mensagem de erro.
   */
  constructor(message: string) {
    super(message);
    this.name = 'LinketrackError';
  }
}
