import { faker } from '@faker-js/faker';

class ContainerFaker {
  #products;
  constructor() {
    this.#products = [];
  }

  async create() {
    for (let cant = 0; cant < 5; cant++) {
      const object = {
        id: cant,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        thumbnail: faker.image.technics()
      };
      this.#products.push(object);
    }
  }

  async getAll() {
    await this.create();
    return this.#products;
  }
}

export const fakerProducts = new ContainerFaker();