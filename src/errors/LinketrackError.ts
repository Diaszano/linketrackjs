export default class LinketrackError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LinketrackError';
  }
}
