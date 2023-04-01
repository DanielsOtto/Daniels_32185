// objeto de negocio -- Clase 20
export class ProductDto {
  constructor({ id, name, price, description, thumbnail }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.thumbnail = thumbnail;
  }
}