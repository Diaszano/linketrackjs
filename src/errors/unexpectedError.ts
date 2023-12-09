/**
 * Erro lançado quando ocorre um erro inesperado.
 */
export class UnexpectedError extends Error {
  /**
   * Construtor da classe UnexpectedError.
   *
   * @param {string} message - Uma mensagem descritiva sobre o erro.
   */
  constructor(message: string) {
    const github = 'https://github.com/Diaszano/linketrackjs/issues';
    super(`${message}\nEnvie esse erro para: ${github}.`);
    this.name = 'UnexpectedError';
  }
}
