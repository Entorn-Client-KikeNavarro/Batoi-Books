import View from '../view/view.class'
import Books from '../model/books.class';
import Users from '../model/users.class';
import Modules from '../model/modules.class';
import Cart from '../model/cart.class.js'; 
import Book from '../model/book.class.js'; 


export default class Controller{
    constructor(){
        this.view = new View();
        this.users = new Users();
        this.books = new Books();
        this.modules = new Modules();
        this.cart = new Cart();
    }

    async handleSubmitProductForm(formData) {
        try {
            const bookData = { ...formData };
            if (!bookData.userId) {
                bookData.userId = 2;
            }

            if (formData.id) {
                bookData.id = parseInt(formData.id);
                const updatedBook = await this.books.changeBook(bookData);
                this.view.updateBookInList(new Book(updatedBook));
                this.view.renderMessage('success', `Libro ${updatedBook.id} modificado correctamente.`);
            } else {
                delete bookData.id; 
                const newBook = await this.books.addBook(bookData);
                this.view.renderBook(new Book(newBook)); 
                this.view.renderMessage('success', `Libro ${newBook.id} añadido correctamente.`);
            }
            
            this.view.resetForm();

        } catch (error) {
            this.view.renderMessage('error', `Error al guardar el libro: ${error.message}`);
        }
    }

    async handleRemoveBook(id) {
        try {
            const book = this.books.getBookById(parseInt(id)); 
            if (confirm(`¿Seguro que quieres borrar el libro ${book.id} (${book.moduleCode})?`)) {
                await this.books.removeBook(parseInt(id));
                this.view.removeBook(id);
                this.view.renderMessage('success', `Libro ${id} eliminado.`);
            }
        } catch (error) {
            this.view.renderMessage('error', `Error al eliminar el libro: ${error.message}`);
        }
    }

    handleEditBook(id) {
        try {
            const book = this.books.getBookById(parseInt(id));
            this.view.populateForm(book);
            window.scrollTo(0, 0);
        } catch (error) {
            this.view.renderMessage('error', `Error al cargar datos para editar: ${error.message}`);
        }
    }

    handleAddToCart(id) {
        try {
            const book = this.books.getBookById(parseInt(id));
            this.cart.addItem(book);
            this.view.renderMessage('success', `Libro ${id} añadido al carrito.`);
            console.log('Estado del carrito:', this.cart.toString());
        } catch (error) {
            this.view.renderMessage('error', error.message);
        }
    }
    
    async init(){
        try{
            this.view.bindSubmitForm(this.handleSubmitProductForm.bind(this));
            this.view.bindResetForm(); 
            this.view.bindBookActions(
                this.handleAddToCart.bind(this),
                this.handleEditBook.bind(this),
                this.handleRemoveBook.bind(this)
            );

            await Promise.all([
                this.books.populate(),
                this.users.populate(),
                this.modules.populate(),
                this.cart.populate()
            ]);
        } catch(error) {
            this.view.renderMessage("error", "Error al inicializar la aplicación: " + error.message);
            return;
        }

        try {
            this.view.renderModulos(this.modules.data);
            this.books.data.forEach(book => {
                this.view.renderBook(book);
            });
        } catch (error) {
            this.view.renderMessage("error", "Error al renderizar datos: " + error.message);
        }
    }
}