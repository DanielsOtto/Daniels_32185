class Container {
    #array;

    constructor() {
        this.#array = [];
    }

    save(id, title, price, url) {
        const obj = {
            id: id,
            title: title,
            price: price,
            thumbnail: url
        }
        this.#array.push(obj);
    }

    getAll() {
        return this.#array;
    }

    getById(id) {
        if(this.#array.find(element => element.id === id)){
            return this.#array.find(element => element.id === id);
        }
        return null;
    }

    deleteById(id) {
        if(this.#array.map(obj => obj.id).indexOf(id) >= 0){ 
            let index = this.#array.map(obj => obj.id).indexOf(id);
            this.#array.splice(index,1);
        }else{
            console.log('Objeto no encontrado');
        }
    }

    deleteAll() {
        this.#array = [];
    }
}
const books = new Container();

books.save(1, 'oneBook', 500, 'www.thepage.com');
books.save(2, 'twoBook', 400, 'www.otherpage.com');
books.save(3, 'theBook', 600, 'www.thebestpage.com');
console.log(books.getAll());  
/* Muestra los objetos cargados en el arreglo */

console.log(books.getById(1));
/* Si encuentra el objeto lo retorna, si no devuleve null */

books.deleteById(1);
/* Si encuentra el objeto, lo elimina del arreglo */
console.log(books.getAll());

books.deleteAll();
/* vacia el arreglo */

console.log(books.getAll());

