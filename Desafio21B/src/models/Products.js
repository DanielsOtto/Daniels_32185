import { ProductDto } from "../dtos/ProductDto.js";
import { productsList } from "../repositories/productsList/index.js";

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

  // SETTERS
  set name(name) {
    this.#name = name;
  }
  set price(price) {
    this.#price = price;
  }
  set description(description) {
    this.#description = description;
  }
  set thumbnail(thumbnail) {
    this.#thumbnail = thumbnail;
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


  // crear otro metodo para actualizar y validar ciertos valores del objeto
  async updateProduct(data) {
    // validar la data ingresada
    if (data.name) {
      if (data.name.length < 2 || data.name.length > 35) throw new Error('El nombre del producto excede los 35 caracteres o no supera 1 caracter.');
    }
    if (data.price) {
      if (!Number.isInteger(data.price)) throw new Error('El precio tiene que ser un entero.');
      if (data.price <= 0) throw new Error('El precio ingresado tiene que ser mayor o igual a 1.');
    }
    if (data.description) {
      const phrase = data.description.replace(/\s+/g, '');
      if (phrase.length === 0) throw new Error('No se esta ingresando una descripcion.');
      if (data.description.length > 100) throw new Error('La descripcion es muy extensa.');
    }
    if (data.thumbnail) {
      const phrase = data.thumbnail.replace(/\s+/g, '');
      if (phrase.length === 0) throw new Error('No se esta ingresando una link correcto.');
      if (data.thumbnail.length > 100) throw new Error('El link es muy extensa.');
    }

    if (data.name) this.name = data.name;
    if (data.price) this.price = data.price;
    if (data.description) this.description = data.description;
    if (data.thumbnail) this.thumbnail = data.thumbnail;
  }
}