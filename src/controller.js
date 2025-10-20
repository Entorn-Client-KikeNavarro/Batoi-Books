import data from './services/datos.js';
import { Books } from './model/books.class.js';
import { Modules } from './model/modules.class.js';
import View from './view.js';

export default class Controller {
  constructor() {
    this.booksModel = new Books();
    this.modulesModel = new Modules();
    this.view = new View();
  }

  init() {
    // Cargar datos en los modelos
    this.booksModel.setBooks(data.books);
    this.modulesModel.setModules(data.modules);

    // Renderizar elementos iniciales
    this.view.fillModuleSelect(this.modulesModel.getModules());
    this.renderAllBooks();

    // Configurar manejadores de eventos
    this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
    this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
  }

  renderAllBooks() {
      this.view.clearBooksList();
      const books = this.booksModel.getBooks();
      books.forEach(book => {
          const module = this.modulesModel.getModuleByCode(book.moduleCode);
          if (module) {
              this.view.renderBook(book, module);
          }
      });
  }

  handleSubmitBook(bookData) {
    try {
      // Asignamos un userId por defecto, en una app real vendría del usuario logueado
      const newBook = { ...bookData, userId: 2, photo: '' };
      this.booksModel.addBook(newBook);
      this.renderAllBooks(); // Re-renderizar la lista de libros
      this.view.showMessage('info', 'Libro añadido correctamente');
    } catch (error) {
      this.view.showMessage('error', `Error al añadir el libro: ${error.message}`);
    }
  }

  handleRemoveBook(id) {
    try {
      const success = this.booksModel.removeBook(id);
      if (success) {
        this.renderAllBooks(); // Re-renderizar la lista de libros
        this.view.showMessage('info', 'Libro eliminado correctamente');
      } else {
        this.view.showMessage('error', 'No se encontró un libro con esa ID');
      }
    } catch (error) {
      this.view.showMessage('error', `Error al eliminar el libro: ${error.message}`);
    }
  }
}