import View from '../view/view.class'
import Books from '../model/books.class';
import Users from '../model/users.class';
import Modules from '../model/modules.class';


export default class Controller{
    constructor(){
        this.view = new View();
        this.users = new Users();
        this.books = new Books();
        this.modules = new Modules();

    }

    handlerSubmitBook(book){
        book = new Book(book.id, book.userId, book.moduleCode, book.publisher, book.price, book.pages, book.status);
        this.books.addBook(book);
        this.view.renderBook(book);
        
    }

    handleRemoveBook(id){
        this.books.removeBook(id);
        this.view.removeBook(id);
    }
    
async init(){
    try{
        document.getElementById("btn-remove").addEventListener("click", ()=>{
            //const id = document.getElementById("id").value();
            //this.handleRemoveBook(id);
            alert("boton pulsado");
        })
        await Promise.all([
            this.books.populate(),
            this.users.populate(),
            this.modules.populate()
        ])
    }catch(error){
        this.view.renderMessage("error", "error" + error)
    }
    this.view.renderModulos(this.modules.data);
    this.books.data.forEach(book => {

                this.view.renderBook(book);
            });
}
}


