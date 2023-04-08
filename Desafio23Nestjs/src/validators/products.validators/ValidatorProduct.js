export class ValidatorProduct {
  constructor({ name, price, description, thumbnail }) {
    this.name = name;
    if (typeof this.name !== 'string' || !this.name) throw new Error('ERROR: The product name has to be a string!');
    if (this.name.length > 50) throw new Error('ERROR: The product name is very longer!')
    this.price = price;
    if (isNaN(this.price) || !this.price) throw new Error('ERROR: The product price has to be a number!');
    if (this.price <= 0) throw new Error('ERROR: The product price has to be positive and greater than 0!');
    if (this.price % 1 !== 0) throw new Error('ERROR: The product price has to be an integer number!');
    this.description = description;
    if (typeof this.description !== 'string' || !this.description) throw new Error('ERROR: The product description has to be a string!');
    if (this.description.length > 700) throw new Error('ERROR: The product description is very longer!');
    this.thumbnail = thumbnail;
    if (typeof this.thumbnail !== 'string' || !this.thumbnail) throw new Error('ERROR: The product thumbnail has to be a string!');
    if (this.thumbnail.length > 50) throw new Error('ERROR: The product thumbnail is very longer!');
  }
} 