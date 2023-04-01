export class OutOfStockError extends Error {
  constructor(id) {
    super(`There is not enough stock for the prod ${id}`);
    this.type = 'NO_STOCK';
  }
}