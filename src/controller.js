import data from './services/datos.js';
import Books from './model/books.class.js';
import Users from './model/users.class.js';
import Modules from './model/modules.class.js';

import View from './view.js';

export default class Controller {
  constructor() {
    this.booksModel = new Books();
    this.usersModel = new Users();
    this.modulesModel = new Modules();
    this.view = new View();
  }

  init() {
    try {
      // 1. Cargar datos en el modelo (usando datos.js)
      // Asumo que tus clases tienen un método 'populate' que acepta los datos
      this.booksModel.populate(data.books);
      this.usersModel.populate(data.users);
      this.modulesModel.populate(data.modules);

      // 2. Cuando tenga los módulos, llamo a la vista para renderizar el SELECT
      this.view.fillModuleSelect(this.modulesModel.getModules());

      // 3. Cuando tenga los libros, llamo a la vista para renderizarlos
      this.renderAllBooks();
      
      // 4. Pone los escuchadores en la vista
      this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
      this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
      
    } catch (error) {
        this.view.showMessage('error', `Error al inicializar la aplicación: ${error.message}`);
    }
  }

  // Método para (re)pintar todos los libros
  renderAllBooks() {
      this.view.clearBooksList();
      const books = this.booksModel.getBooks();
      books.forEach(book => {
          const module = this.modulesModel.getModuleById(book.moduleCode); // Asumo que getModuleById existe
          if (module) {
              this.view.renderBook(book, module);
          } else {
              console.warn(`Módulo no encontrado para el libro con ID: ${book.id}`);
          }
      });
  }

  // Manejador para AÑADIR un libro
  handleSubmitBook(bookData) {
    try {
      // Asigno un userId por defecto (ej. 2) y foto vacía, ya que el form no lo pide
      const newBookData = { ...bookData, userId: 2, photo: "" };
      
      this.booksModel.addBook(newBookData); // Asumo que addBook existe
      
      this.renderAllBooks(); // Re-renderizar la lista
      this.view.showMessage('info', 'Libro añadido correctamente');
    } catch (error) {
      this.view.showMessage('error', `Error al añadir el libro: ${error.message}`);
    }
  }

  // Manejador para BORRAR un libro
  handleRemoveBook(id) {
    try {
      this.booksModel.removeBook(id); // Asumo que removeBook existe
      
      this.renderAllBooks(); // Re-renderizar la lista
      this.view.showMessage('info', 'Libro eliminado correctamente');
    } catch (error) {
      this.view.showMessage('error', `Error al eliminar el libro: ${error.message}`);
    }
  }
}