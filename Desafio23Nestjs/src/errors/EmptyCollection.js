export class EmptyCollection extends Error {
  constructor(object) {
    super(object);
    this.type = 'EMPTY_COLLECTION';
  }
}