export class IdNotFoundError extends Error {
  constructor(id) {
    super(`The id was not found: ${id}!`);
    this.type = 'ID_NOT_FOUND';
  }
}