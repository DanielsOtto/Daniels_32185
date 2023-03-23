import { ProductDto } from "../dtos/ProductDto.js";

export class Product {
  #id;
  #name;
  #price;
  #description;
  #thumbnail;
  constructor({ id, name, price, description, thumbnail }) {
    this.#id = id;
    this.#name = name;
    this.#price = price;
    this.#description = description;
    this.#thumbnail = thumbnail;
  }

  // getters --- se invocan sin el ()
  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get price() {
    return this.#price;
  }
  get description() {
    return this.#description;
  }
  get thumbnail() {
    return this.#thumbnail;
  }


  // retorna datos "accesibles"
  datos() {
    return new ProductDto({ // devolviendo un objeto de negocio
      id: this.#id,
      name: this.#name,
      price: this.#price,
      description: this.#description,
      thumbnail: this.#thumbnail
    });
  }

  // metodos propios del objeto
  disminuirStock() { }
  // que otros metodos pueden ser ?
}