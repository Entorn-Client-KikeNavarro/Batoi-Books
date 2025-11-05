import Book from "./book.class.js";
import {getDBBooks, addDBBook , removeDBBook, changeDBBook} from '../services/api.js'

export default class Books{
    constructor(){
        this.data = [];
    }

    async populate(){
        const books = await getDBBooks();
        books.forEach(book => {
            let libroAIntroducir = new Book(book);
            this.data.push(libroAIntroducir);
        });
    }

    async getBook(id){
        const returnedBook = await getDBBook(id);
        return returnedBook;
    }

    async addBook(book){
        const bookAdd = await addDBBook(book);
        return bookAdd;
    }

    async changeBook(book){
        const bookchanged = await changeDBBook(book);
        return bookchanged;
    }

    getBookIndexById(bookId) {
    const index = this.data.findIndex((book) => book.id === bookId);
    if (index === -1) throw new Error("Book not found");
    return index;
    }

    getBookById(id) {
        const book = this.data.find((book) => book.id === id);
        if (!book) throw new Error(`Libro con ID ${id} no encontrado.`);
        return book;
    }
    
    async removeBook(id){
        const removedBok = await removeDBBook(id);
        const index = this.getBookIndexById(id);
        this.data.splice(index, 1);
    }

    toString(){
        
    }
}