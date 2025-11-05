import Book from "./book.class.js";

export default class Cart {
    constructor() {
        this.data = [];
    }

    populate() {
        
    }

    getBookById(id) {
        return this.data.find(book => book.id === id) || {};
    }

    addItem(book) {
        const bookExists = this.data.some(item => item.id === book.id);
        if (bookExists) {
            throw new Error(`El libro con ID ${book.id} ya está en el carrito.`);
        }
        this.data.push(new Book(book));
    }

    removeItem(id) {
        const index = this.data.findIndex(book => book.id === id);
        if (index === -1) {
            throw new Error(`El libro con ID ${id} no se encontró en el carrito.`);
        }
        this.data.splice(index, 1);
    }

    toString() {
        if (this.data.length === 0) {
            return "El carrito está vacío.";
        }
        return this.data.map(book => book.toString()).join('\n');
    }
}