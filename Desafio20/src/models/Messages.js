import { MessageDto } from '../dtos/MessageDto.js';

export class Message {
  #id;
  #email;
  #message;
  constructor(id, email, message) { // va la fecha ?
    this.#id = id;
    this.#email = email;
    this.#message = message;
  };

  // getters
  get id() {
    return this.#id;
  }
  get email() {
    return this.#email;
  }
  get message() {
    return this.#message;
  }

  // Retorna atributos "accesibles"
  datos() {
    return new MessageDto({
      id: this.#id,
      email: this.#email,
      message: this.#message
    });
  }
  // metodos propios del objeto
  calcularCaracteres(id) // x ejemplo
}