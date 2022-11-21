const fs = require('fs').promises;

class Container {
  #fileProds;
  #arrayProds;
  #fileChats;
  #arrayChats;
  constructor(fileP, fileC) {
    this.#fileProds = fileP;
    this.#arrayProds = [];
    this.#fileChats = fileC;
    this.#arrayChats = [];
  }

  async save(obj) {
    try {
      if (obj.name !== "") {
        this.#arrayProds.push(obj);
        await fs.writeFile(this.#fileProds, JSON.stringify(this.#arrayProds));
      }
    } catch (error) {
      throw new Error('Se ha producido un error en el metodo save');
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.readFile(this.#fileProds, 'utf-8'));
    } catch (error) {
      throw new Error('Se ha producido un error en el metodo getAll');
    }
  }

  async getById(id) {
    try {
      this.#arrayProds = JSON.parse(await fs.readFile(this.#fileProds, 'utf-8'));
      const object = this.#arrayProds.find(element => element.id === id);
      if (!object) {
        return null;
      }
      return object;
    } catch (error) {
      throw new Error('Se ha producido un error en el metodo getElementById');
    }
  }

  async updateById(id, obj) {
    try {
      this.#arrayProds = await this.getAll();
      let pos = this.#arrayProds.indexOf(elem => elem.id === id);
      if (pos >= 0) {
        this.#arrayProds.slice(pos, 1, obj);
      }
      await fs.writeFile(this.#fileProds, JSON.stringify(this.#arrayProds));
    } catch (error) {
      throw new Error('Se ha producido un error en el metodo updateById');
    }
  }

  async deleteById(id) {
    try {
      this.#arrayProds = await this.getAll();
      const array = this.#arrayProds.filter(elem => elem.id !== id);
      await fs.writeFile(this.#fileProds, JSON.stringify(this.#arrayProds));
    } catch (error) {
      throw new Error('Se ha producido un error en el metodo deleteById');
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.#fileProds, JSON.stringify('[]'));
    } catch (error) {
      throw new Error('Se ha producido un error en el metodo deleteAll');
    }
  }

  // --- faltan metodos para intereactuar con los chats

  async saveMessage(objMsg) {
    try {
      this.#arrayChats.push(objMsg);
      await fs.writeFile(this.#fileChats, JSON.stringify(this.#arrayChats));
    } catch (error) {
      throw new Error('Se ha producido un error en el metodo saveMessage');
    }
  }

  async getMessages() {
    try {
      return JSON.parse(await fs.readFile(this.#fileChats, 'utf-8'));
    } catch (error) {
      throw new Error('Se ha producido un error en el metodo getMessages');
    }
  }
}

fs.writeFile('./fileProds.txt', '[]');
fs.writeFile('./fileChats.txt', '[]');

const element = new Container('./fileProds.txt', './fileChats.txt');
module.exports = element;