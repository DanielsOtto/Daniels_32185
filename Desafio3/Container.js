const fs = require('fs').promises;

class Container {
  constructor(ruta) {
    this.array = [];
    this.file = ruta;
  }
  async save(obj) {
    try {
      this.array.push(obj);
      await fs.writeFile(this.file, JSON.stringify(this.array, null, '\t'));
    } catch (error) {
      throw new Error('Error in the method save');
    }
  }

  async getById(id) {
    try {
      const array = JSON.parse(await fs.readFile(this.file, 'utf-8'));
      const obj = array.find(element => element.id === id);
      if (!obj) {
        return null;
      }
      return obj;
    } catch (error) {
      throw new Error('Error in the method getById');
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.readFile(this.file, 'utf-8'));
    } catch (error) {
      throw new Error('Error in the method getAll');
    }
  }

  async deleteById(id) {
    try {
      const array = JSON.parse(await fs.readFile(this.file, 'utf-8'));
      const newArray = array.filter(element => element.id !== id);
      await fs.writeFile(this.file, JSON.stringify(newArray, null, '\t'));
    } catch (error) {
      throw new Error('Error in the method deleteById');
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.file, '[]');
    } catch (error) {
      throw new Error('Error in the method deleteAll')
    }
  }
}

module.exports = Container;
// exports.callContainer = callContainer(); // sirve ? viejo