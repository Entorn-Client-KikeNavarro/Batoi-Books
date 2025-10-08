import Book from "./book.class.js";
let nextId = 1;
const NOTES = "Apunts";
export default class Books {
  constructor(data) {
    this.data = this.data || [];
  }

  populate(libros) {
    libros.forEach((libro) => {
      let libroNuevo = new Book(libro);
      this.data.push(libroNuevo);
    });
    const maxId = this.data.reduce(
      (max, item) => (item.id > max ? item.id : max),
      0
    );
    nextId = maxId + 1;
  }

  addBook(book) {
    const newBook = new Book({ id: nextId++, ...book });
    this.data.push(newBook);
    return newBook;
  }

  removeBook(bookId) {
    const index = this.getBookIndexById(bookId);
    this.data.splice(index, 1);
  }

  changeBook(book) {
    const index = this.getBookIndexById(book.id);
    const modifiedBook = new Book(book);
    this.data.splice(index, 1, modifiedBook);
    return modifiedBook;
  }

  getBookIndexById(bookId) {
    let book = this.data.findIndex((libro) => libro.id === bookId);
    if (book === -1) throw new Error("Libro no encontrado");
    return book;
  }

  getBookById(bookId) {
    const book = this.data.find((item) => item.id === bookId);
    if (!book) {
      throw new Error(`No existe el libro con id ${bookId}`);
    }
    return book;
  }
  bookExists(userId, moduleCode) {
    return !!this.data.find(
      (item) => item.userId === userId && item.moduleCode === moduleCode
    );
  }

  booksFromUser(userId) {
    return this.data.filter((item) => item.userId === userId);
  }

  booksFromModule(moduleCode) {
    return this.data.filter((item) => item.moduleCode === moduleCode);
  }

  booksCheeperThan(price) {
    return this.data.filter((item) => item.price <= price);
  }

  booksWithStatus(status) {
    return this.data.filter((item) => item.status === status);
  }

  averagePriceOfBooks(books) {
    const sum = this.data.reduce((total, item) => total + item.price, 0);
    return this.data.length
      ? (sum / this.data.length).toFixed(2) + " €"
      : "0.00 €";
  }

  booksOfTypeNotes(books) {
    return this.data.filter((item) => item.publisher === NOTES);
  }

  booksNotSold(books) {
    return this.data.filter((item) => !item.soldDate);
  }

  incrementPriceOfbooks(increment) {
    return this.data.map((book) => ({
      ...book,
      price: Math.round(book.price * (1 + increment) * 100) / 100,
    }));
  }
  toString() {
    let text = `Books: ${this.data.length}`;
    this.data.forEach((item) => {
      text += `\n${item.toString()}`;
    });
    return text;
  }
}
